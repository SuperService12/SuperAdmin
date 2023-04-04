import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import SuperServer from "./../../api/SuperServer";

const UserComponent = () => {
  const [visible, setVisible] = React.useState(true);
  const [user, setUser] = React.useState({});
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    console.log("userComponent");
    dispatch(listUser());
  }, [dispatch]);
  return (
    <section className="content-main">
      <div
        id="exampleModalCenter"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        className={visible ? "d-n" : "vis"}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ height: "100%" }}
        >
          <div className="modal-content" style={{ height: "100%" }}>
            <div className="modal-header">
              <h3 className="modal-title" id="exampleModalLongTitle">
                {user.name || "Title"}
              </h3>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setVisible(!visible)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {user.image ? (
                <img
                  src={user.image}
                  alt="certificate"
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />
              ) : (
                <h4>No Certificate uploaded</h4>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setVisible(!visible)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={async () => {
                  const res = await SuperServer.delete(
                    `/api/users/api/user/${user._id}`
                  );
                  if (res.status === 200) setVisible(!visible);
                }}
              >
                Delete Seller
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-header">
        <h2 className="content-title">Customers</h2>
        <div>
          <Link to="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
              />
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {users.map((user) => {
                if (user.isVendor === true) {
                  return (
                    <div className="col" key={user._id}>
                      <div className="card card-user shadow-sm">
                        <div className="card-header">
                          <img
                            className="img-md img-avatar"
                            src="/favicon.jpg"
                            alt="User pic"
                          />
                        </div>
                        <div className="card-body">
                          <h5
                            className="card-title mt-5"
                            onClick={() => {
                              setUser(user);
                              setVisible(!visible);
                            }}
                            style={{ cursor: "pointer", color: "blue" }}
                          >
                            {user.name}
                          </h5>
                          <div className="card-text text-muted">
                            {user.isAdmin === true ? (
                              user.isVendor === true ? (
                                <p className="m-0">Seller</p>
                              ) : (
                                <p className="m-0">Admin</p>
                              )
                            ) : (
                              <p className="m-0">Customer</p>
                            )}

                            <p>
                              <a href={`mailto:${user.email}`}>{user.email}</a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
