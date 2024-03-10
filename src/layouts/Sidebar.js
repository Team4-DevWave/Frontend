import React from "react";
function SideBar() {
  return (
    <sidebar id="sidebar">
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
        style={{ width: "280px", height: "600px" }}
      >
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a
              href="/home"
              className="nav-link link-body-emphasis"
              aria-current="page"
            >
              <svg
                rpl=""
                fill="currentColor"
                height="20"
                icon-name="home-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {" "}
                <path d="m17.71 8.549 1.244.832v8.523a1.05 1.05 0 0 1-1.052 1.046H12.73a.707.707 0 0 1-.708-.707v-4.507c0-.76-1.142-1.474-2.026-1.474-.884 0-2.026.714-2.026 1.474v4.507a.71.71 0 0 1-.703.707H2.098a1.046 1.046 0 0 1-1.052-1.043V9.381l1.244-.835v9.158h4.44v-3.968c0-1.533 1.758-2.72 3.27-2.72s3.27 1.187 3.27 2.72v3.968h4.44V8.549Zm2.04-1.784L10.646.655a1.12 1.12 0 0 0-1.28-.008L.25 6.765l.696 1.036L10 1.721l9.054 6.08.696-1.036Z"></path>
              </svg>
              <span className="all">Home</span>
            </a>
          </li>
          <li>
            <a href="/popular" className="nav-link link-body-emphasis">
              <svg
                rpl=""
                fill="currentColor"
                height="20"
                icon-name="popular-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.01 10.01 0 0 0 10 0Zm0 18.75a8.7 8.7 0 0 1-5.721-2.145l8.471-8.471v4.148H14V6.638A.647.647 0 0 0 13.362 6H7.718v1.25h4.148L3.4 15.721A8.739 8.739 0 1 1 10 18.75Z"></path>
              </svg>
              <span className="all">Popular</span>
            </a>
          </li>
          <li>
            <a href="/all" className="nav-link link-body-emphasis">
              <svg
                rpl=""
                fill="currentColor"
                height="20"
                icon-name="all-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.01 10.01 0 0 0 10 0Zm5 17.171V6h-1.25v11.894a8.66 8.66 0 0 1-2.75.794V10H9.75v8.737A8.684 8.684 0 0 1 6.47 18H7v-4H5.75v3.642a8.753 8.753 0 1 1 9.25-.471Z"></path>
              </svg>
              <span className="all">All</span>
              <hr />
            </a>
          </li>
          <div className="flex-shrink-0 p-3" style={{ width: "280px" }}>
            <ul className="list-unstyled ps-0">
              <li className="mb-1">
                <button
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
                  data-bs-toggle="collapse"
                  data-bs-target="#home-collapse"
                  aria-expanded="true"
                >
                  RECENT{" "}
                  <svg
                    rpl=""
                    fill="currentColor"
                    height="20"
                    icon-name="caret-down-outline"
                    viewBox="0 0 20 20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
                  </svg>
                </button>
                <div className="collapse-show" id="home-collapse">
                  <ul className="btn-toggle-nav list-unstyled fw-normal pb-1">
                    <li>
                      <a
                        href="https://www.youtube.com/watch?v=mlYQtVAieCo"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        t/AkiraToriyamaOfficial
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        t/Ahlyyy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                      >
                        t/zamalek
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </sidebar>
  );
}
export default SideBar;
