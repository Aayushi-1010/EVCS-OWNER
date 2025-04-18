import React, { useState, useCallback, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";

import Table from "../../Components/common/table";
import PageHeader from "../../Components/common/pageHeader";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import Button from "../../Components/common/Button";
import { useSelector } from "react-redux";
import useFirebaseContext from "../../hooks/firebase";
import { toast } from "react-toastify";
import { REFUND_API } from "../../environment";

const BookedSlots = () => {
  const [slotsBookingData, setSlotsBookingData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const { isAdmin, ownerData } = useSelector((state) => state);
  const { getDocuments, updateDocument } = useFirebaseContext();

  const handleApproveRejection = async (data) => {
    setIsFetchingData(true);
    try {
      const userId = data.userDetails.id;
      const stationId = data.stationDetails.id;
      // console.log("PaymentIntentId : ",)
      delete data["userDetails"];
      await updateDocument(`users/${userId}/booking`, data.id, {
        ...data,
        status: "cancelled",
        payment: "refunded",
      });
      console.log(data.paymentIntentId);

      const querySnapshot = await getDocuments("stations");
      const result = querySnapshot.docs.find((doc) => doc.id === stationId);
      const STATION_DATA = result.data();
      // eslint-disable-next-line array-callback-return
      const updatedSlotsData = STATION_DATA.slotsBooked.map((slots) => {
        if (
          slots.plug === data.plug &&
          slots.seconds === data.seconds &&
          slots.timing === data.timing &&
          data.status === "reject-request"
        ) {
          return { ...slots, status: "cancelled" };
        } else {
          return slots;
        }
      });
      await updateDocument(`stations`, stationId, {
        ...STATION_DATA,
        slotsBooked: updatedSlotsData,
      });
      toast.success(`Slot Booking Cancelled Successful`);
      console.log("ownerData",ownerData)
      await fetchSlotsBookingDataByUsers();
      // console.log('paymentIntentId..................',data.paymentIntentId);
      // console.log('price..................',data.price);


      if (data.paymentIntentId) {
        const response = await fetch(`${REFUND_API}/create-refund`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payment_intent: data.paymentIntentId,
          }),
        });
  
        console.log('response',response);
        
        const responseData = await response.json();
  
        if (response.ok && responseData.refund) {
          toast.success('Refund Successful', 'The refund was processed successfully.');
        } else {
          toast.error('Refund Failed', 'The refund process failed.');
        }
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookingData = useCallback((initialData, data) => {
    data.forEach((item, ind) => {
      initialData.push({
        col1: ind + 1,
        col2: <Link>{item.userDetails?.id}</Link> || "-",
        col3: item.stationDetails.stationName || "-",
        col4: new Date(item.date.seconds * 1000).toDateString() || "-",
        col5: item.timing || "-",
        col6: item.plug || "-",
        col7: new Date(item.createdAt.seconds * 1000).toLocaleString() || "-",
        col8: (
          <Button
            className={`${
              item.status === "booked" ? "outline" : "danger"
            } text--capitalize`}
          >
            {item.status}
          </Button>
        ),
        col9:
          item.status === "reject-request" ? (
            <Button onClick={() => handleApproveRejection(item)}>
              {"Approve Rejection"}
            </Button>
          ) : (
            "N/A"
          ),
      });
    });
    return initialData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(
    () => handleBookingData([], slotsBookingData),
    [slotsBookingData, handleBookingData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Sr.no",
        accessor: "col1",
      },
      {
        Header: "user",
        accessor: "col2",
      },
      {
        Header: "Station Name",
        accessor: "col3",
      },
      {
        Header: "Schedule date",
        accessor: "col4",
      },
      {
        Header: "Schedule time",
        accessor: "col5",
      },
      {
        Header: "plug",
        accessor: "col6",
      },
      {
        Header: "booked at",
        accessor: "col7",
      },
      {
        Header: "status",
        accessor: "col8",
      },
      {
        Header: "action",
        accessor: "col9",
      },
    ],
    []
  );
console.log("ownerData",ownerData)
  const getOwnerStationData = async () => {
    try {
      console.log("ownerData",ownerData)
      const query = [{ field: "owner", operator: "==", value: ownerData.id }];
      const querySnapshot = await getDocuments(
        "stations",
        !isAdmin ? query : []
      );
      const STATION_DATA = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return STATION_DATA;
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchSlotsBookingDataByUsers = async () => {
    try {
      let stationData;
      if (!isAdmin) {
        console.log("ownerData",ownerData)
        stationData = await getOwnerStationData();
      }
      // Get reference to the users collection
      setIsFetchingData(true);
      const usersCollection = collection(db, "users");

      const usersSnapshot = await getDocs(usersCollection);

      const bookingData = [];

      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();

        const bookingCollectionRef = collection(userDoc.ref, "booking");

        const bookingSnapshot = await getDocs(bookingCollectionRef);

        bookingSnapshot.docs.forEach((bookingDoc) => {
          bookingData.push({
            userDetails: { id: userDoc.id, ...userData },
            id: bookingDoc.id,
            ...bookingDoc.data(),
          });
          // console.log(bookingData);
        });
      }

      if (isAdmin) {
        setSlotsBookingData(bookingData);
      } else {
        console.log("stationData", stationData);
        // eslint-disable-next-line array-callback-return
        const filteredData = bookingData.filter((booking) => {
          const result = stationData.find(
            ({ id }) => id === booking.stationDetails.id
          );
          if (result) {
            return booking;
          }
        });
        setSlotsBookingData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetchingData(false);
    }
  };

  useEffect(() => {
    fetchSlotsBookingDataByUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerData, isAdmin]);

  return (
    <div className="page-wrapper">
      <div className={"data-list-section"}>
        <PageHeader title={`Slot Booking (${data.length})`} />
        <div className="flex flex--column gap--20 table-container mt--page">
          <Table
            columns={columns}
            data={data}
            loading={isFetchingData}
            tableTitle={"Users Summary"}
          />
        </div>
      </div>
    </div>
  );
};

export default BookedSlots;
