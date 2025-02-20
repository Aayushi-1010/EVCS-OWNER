import React, { Fragment, useCallback, useEffect, useState } from "react";
import { IoTimeOutline } from "react-icons/io5";
import style from "./dashboard.module.scss";
import useFirebaseContext from "../../hooks/firebase";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import { useSelector } from "react-redux";

function RecentActivity() {
  const [isLoading, setIsLoading] = useState(false);
  const [recentData, setRecentData] = useState([]);
  const { getDocuments } = useFirebaseContext();
  const { isAdmin } = useSelector((state) => state);

  const getRecentActivity = useCallback(async () => {
    setIsLoading(true);
    try {
      await getDocuments("recent_activity").then((querySnapshot) => {
        const RECENT_ACTIVITY_DATA = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRecentData(RECENT_ACTIVITY_DATA);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
    }
  }, [getDocuments]);

  useEffect(() => {
    getRecentActivity();

    return () => {};
  }, [getRecentActivity]);
  const navigate = useNavigate();
  return (
    <aside className={style["recent-activity"]}>
      <span>
        <IoTimeOutline />
        {!isAdmin ? "Last Booked Slots" : "Recent Activity"}
      </span>
      <ul className="pt--16">
        {isLoading ? (
          <Fragment>
            <Skeleton.Button style={{ height: 90, width: "100%" }} active />
            <Skeleton.Button style={{ height: 90, width: "100%" }} active />
            <Skeleton.Button style={{ height: 90, width: "100%" }} active />
            <Skeleton.Button style={{ height: 90, width: "100%" }} active />
            <Skeleton.Button style={{ height: 90, width: "100%" }} active />
            <Skeleton.Button style={{ height: 90, width: "100%" }} active />
          </Fragment>
        ) : (
          recentData.map((data, index) => (
            <li
              key={index}
              onClick={() => data.redirectUrl && navigate(data.redirectUrl)}
              className="pointer"
            >
              <h4>{data.type}</h4>
              <span>{data.title}</span>
              <div>
                <span>
                  {moment(data.createdAt.toDate().toDateString()).format(
                    "DD-MM-YYYY"
                  )}
                </span>
                <span>
                  {data.createdAt.toDate().toLocaleTimeString("en-US")}
                </span>
              </div>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}

export default RecentActivity;
