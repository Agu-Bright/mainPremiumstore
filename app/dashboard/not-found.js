import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pages-404 content-area-11">
      <div className="container" style={{ maxWidth: "1240px !important" }}>
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-12">
            <div className="error404-content">
              <div className="error404">404</div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-5 col-md-12">
            <div className="nobottomborder">
              <h1>Ooops, This Page Could Not Be Found!</h1>
              <p>
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>
            </div>
            <div className="coming-form clearfix">
              <form className="form-inline" action="#" method="GET">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search For Page"
                />
                <button type="submit" className="btn btn-color">
                  Search
                </button>
              </form>
              <p className="mb-0">Please try searching again</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
