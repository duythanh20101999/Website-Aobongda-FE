import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { APP_BASE_URL } from "../../../configs/constants";
import ViewClub from "./ViewClub";

function ViewProduct(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const [club, setClub] = useState([]);

  //const productCount = product.length;

  useEffect(() => {
    let isMounted = true;

    //const product_slug = props.match.params.slug;
    const name_product = props.match.params.product;
    const name_club = props.match.params.club;
    // axios.get(`/api/product/?name=${name_product}`).then((res) => {
    //   if (isMounted) {
    //     if (res.data.success === true) {
    //       setProduct(res.data.data);
    //       setLoading(false);
    //     } else if (res.data.suscess === false) {
    //       history.push("/collections");
    //       swal("Warning", res.data.message, "error");
    //     }
    //   }
    // });
    axios.get(`/api/products`).then((res) => {
      if (isMounted) {
        if (res.data.success === true) {
          setProduct(res.data.datas);
          setLoading(false);
        } else if (res.data.suscess === false) {
          history.push("/collections");
          swal("Warning", res.data.message, "error");
        }
      }
    });
    axios.get(`/api/club/?name=${name_club}`).then((res) => {
      if (isMounted) {
        if (res.data.success === true) {
          // console.log(res.data.club);
          setClub(res.data.data);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [props.match.params.product, props.match.params.club, history]);
  var showProductList = "";
  if (loading) {
    return <h4>Loading Products...</h4>;
  } else {
    showProductList = product.map((item, idx) => {
      return (
        <div className="col-md-3" key={idx}>
          <div className="card">
            <Link to={`/collections/${item.club.name}/${item.name}`}>
              <img
                src={`${APP_BASE_URL}/images/${item.image}`}
                className="w-100"
                alt={item.image}
              />
            </Link>
            <div className="card-body">
              <Link to={`/collections/${item.club.name}/${item.name}`}>
                <h5>{item.name}</h5>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h6>Collections / {club.name}</h6>
        </div>
      </div>

      <div className="py-3">
        <div className="container">
          <div className="row">{showProductList}</div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
