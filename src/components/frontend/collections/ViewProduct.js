import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { APP_BASE_URL } from "../../../configs/constants";

function ViewProduct(props) {
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [product, setProduct] = useState([]);
	const [league, setLeague] = useState(null);

	const submitAddtocart = (e) => {
		e.preventDefault();

		// const data = {
		//   product_id: product.id,
		//   product_qty: quantity,
		// };

		// axios.post(`/api/cart/add`, data).then((res) => {
		axios
			.post(`/api/cart/add?productId=${product.id}&quantity=1`)
			.then((res) => {
				if (res.data.status === true) {
					//Created - Data Inserted
					swal("Success", res.data.message, "success");
					// } else if (res.data.status === 409) {
					//   //Already added to cart
					//   swal("Success", res.data.message, "success");
					// } else if (res.data.status === 401) {
					//   //Unauthenticated
					//   swal("Error", res.data.message, "error");
					// } else if (res.data.status === 500) {
					//   //Not Found
					//   swal("Warning", res.data.message, "warning");
				}
			});
	};

	useEffect(() => {
		let isMounted = true;
		const id = props.match.params.id;
		const id_league = props.match.params.id_league;

		if (id) {
			axios.get(`/api/product?id_club=${id}`).then((res) => {
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
		}

		if (id_league) {
			axios.get(`/api/product_league?id_league=${id_league}`).then((res) => {
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

			axios.get(`/api/league/${id_league}`).then((res) => {
				if (isMounted) {
					if (res.data.success === true) {
						setLeague(res.data.data);
					}
				}
				else if (res.data.suscess === false) {
					history.push("/collections");
					swal("Warning", res.data.message, "error");
				}
			})
		}

		return () => {
			isMounted = false;
		};
	}, [props.match.params.id, props.match.params.id_league, history]);

	var showProductList = "";
	if (loading) {
		return <h4>Loading Products...</h4>;
	} else {
		if (product.length > 0) {
			showProductList = product.map((item, idx) => {
				return (
					<div className="col-md-3" key={idx}>
						<div className="card">
							<Link to={`/collections/${item.club.name}/${item.id}`}>
								<img
									src={`${APP_BASE_URL}/images/${item.image}`}
									className="w-100"
									alt={item.image}
								/>
							</Link>
							<div className="card-body">
								<div className="d-flex flex-column">
									<Link to={`/collections/${item.club.name}/${item.id}`}>
										<h5>{item.name}</h5>
									</Link>
									<div className="d-flex">
										<button
											type="button"
											className="btn btn-outline-warning w-100 text-danger">{item.price}
										</button>
										<button
											type="button"
											className="btn btn-warning w-75 text-danger"
											onClick={submitAddtocart}>Add to Cart
										</button>
									</div>

								</div>
							</div>
						</div>
					</div>
				);
			});
		}

	}

	return (
		<div>
			<div className="py-3 bg-warning">
				<div className="container">
					{league != null ? (
						<h6 className="mb-0">League / {league?.name}</h6>
					) : (
						<h6 className="mb-0">Club / {product[0]?.club.name}</h6>
					)
					}
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
