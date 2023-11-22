import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2"
import Aos from 'aos'
import 'aos/dist/aos.css'

function Bookingscrren() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();

  const firstdate = moment(fromdate, "DD-MM-YYYY");
  const lastdate = moment(todate, "DD-MM-YYYY");
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(()=>{
    Aos.init({duration : 1200});
},[])

  useEffect(() => {
    async function fetchData() {

      if(!localStorage.getItem("currentUser")){
        window.location.href='/login'
      }
      try {
        setloading(true);
        const data = (
          await axios.post("http://localhost:3000/api/rooms/getroombyid", {
            roomid,
          })
        ).data;
        console.log(data);
        settotalamount(data.rentperday * totaldays);
        setroom(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    }

    fetchData();
  }, []);


  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };

    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom", bookingDetails);
      setloading(false);
      Swal.fire("Congratulations","Your Room Booked successfully","successs").then(result=>{
        window.location.href='/profile';
      })
    } catch (error) {
      setloading(false);
      Swal.fire("Oops","something went wrong","error")
    }

  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs" data-aos='zoom-in'>
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>
                    Name:{JSON.parse(localStorage.getItem("currentUser")).name}
                  </p>
                  <p>From Date:{fromdate}</p>
                  <p>To Date:{todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total days:{totaldays}</p>
                  <p>Rent per day:{room.rentperday}</p>
                  <p>Total Amount:{totalamount}</p>
                </b>
              </div>

              <div style={{ float: "right" } }>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="inr"
                  stripeKey="pk_test_51OD4gNSGJyJME9FcQZQpjfYdY4185bZaefieJt0QG5I532y38SyBZSQlY8by6JCN8Kw9S8JzhKVTJO8SEaJ6tYy500dgDWfDhl"
                >
                  <div data-aos='fade-down'>
                  <button className="btn btn-primary">
                    Pay Now
                  </button>
                  </div>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error message="Something went wrong please try again" />
      )}
    </div>
  );
}

export default Bookingscrren;
