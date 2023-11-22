import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import "antd/dist/reset.css";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker, Space } from "antd";
import Aos from 'aos'
import 'aos/dist/aos.css'
const { RangePicker } = DatePicker;
function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  const [duplicaterooms, setduplicaterooms] = useState();

  const[searchkey,setsearchkey] = useState('');
  const[type, settype] = useState('all');

  useEffect(()=>{
    Aos.init({duration : 1000});
},[])

  useEffect(() => {
    async function fetchData() {
      try {
        setloading(true);
        const data = (
          await axios.get("http://localhost:3000/api/rooms/getallrooms")
        ).data;

        setRooms(data);
        setduplicaterooms(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        console.error(error);
        setloading(false);
      }
    }
    fetchData();
  }, []);

  function filterByDate(dates) {
    setfromdate(dates[0].format("DD-MM-YYYY"));
    settodate(dates[1].format("DD-MM-YYYY"));
  }

  function filterBySearch(){

    const temprooms=duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()));
    setRooms(temprooms);
  }

  function filterByType(e){
    settype(e)

    if(e!=='all'){
      const temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()==e.toLowerCase())
      setRooms(temprooms);
    }
    else{
      setRooms(duplicaterooms)
    }


  }

  return (
    <div className="container">
      <div className="row mt-5 bs" data-aos='zoom-out-up'>
        <div className="col md-3" >
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchkey} onChange={(e) =>{setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
        <select className="form-control" value={type} onChange={(e)=>filterByType(e.target.value)}>
          <option value="all">All</option>
          <option value="deluxe">Deluxe</option>
          <option value="non-deluxe">Non-Deluxe</option>
        </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-3" data-aos='flip-left'>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
