import React from 'react'

const Projects = () => {
  return (
<div className="pc-content">
  <div className="page-header">
    <div className="page-block">
      <div className="row align-items-center">
        <div className="col-md-12">
          <ul className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href="javascript: void(0)">Forms</a></li>
            <li className="breadcrumb-item" aria-current="page">Floating Label</li>
          </ul>
        </div>
        <div className="col-md-12">
          <div className="page-header-title">
            <h2 className="mb-0">Floating Label</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h5>Floating labels</h5>
        </div>
        <div className="card-body">
          <h5>Form controls</h5>
          <hr />
          <form>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="form-floating mb-0">
                  <input type="email" className="form-control" id="floatingInput" placeholder="Email address" />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-0">
                  <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
              </div>
            </div>
          </form>
          <h5 className="mt-3">Default Value</h5>
          <hr />
          <div className="row g-4">
            <div className="col-md-6">
              <form className="form-floating mb-0">
                <input type="email" className="form-control" id="floatingInputValue" placeholder="name@example.com" defaultValue="test@example.com" />
                <label htmlFor="floatingInputValue">Input with value</label>
              </form>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-0">
                <input type="password" className="form-control" id="floatingpassword1" placeholder="password" defaultValue="Password" />
                <label htmlFor="floatingpassword1">Password</label>
              </div>
            </div>
          </div>
          <h5 className="mt-3">Validation styles</h5>
          <hr />
          <div className="row g-4">
            <div className="col-md-6">
              <form className="form-floating mb-0">
                <input type="email" className="form-control is-valid" id="floatingInputInvalid" placeholder="name@example.com" defaultValue="test@example.com" />
                <label htmlFor="floatingInputInvalid">Valid input</label>
              </form>
            </div>
            <div className="col-md-6">
              <form className="form-floating mb-0">
                <input type="email" className="form-control is-invalid" id="floatingInputInvalid1" placeholder="name@example.com" defaultValue="test@example.com" />
                <label htmlFor="floatingInputInvalid1">Invalid input</label>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h5>Textareas</h5>
        </div>
        <div className="card-body">
          <div className="row g-4">
            <div className="col-md-6">
              <h5>Default style</h5>
              <hr />
              <div className="form-floating">
                <textarea className="form-control" id="floatingTextarea" defaultValue={""} />
                <label htmlFor="floatingTextarea">Comments</label>
              </div>
            </div>
            <div className="col-md-6">
              <h5>Custom height</h5>
              <hr />
              <div className="form-floating">
                <textarea className="form-control" id="floatingTextarea2" style={{height: 100}} defaultValue={""} />
                <label htmlFor="floatingTextarea2">Comments</label>
              </div>
            </div>
          </div>
          <h5 className="mt-3">Validation styles</h5>
          <hr />
          <div className="row g-4">
            <div className="col-md-6">
              <div className="form-floating mb-0">
                <textarea className="form-control is-valid" rows={3} placeholder="Leave a comment here" id="floatingTextarea1" defaultValue={"Valid textarea"} />
                <label htmlFor="floatingTextarea1">Comments</label>
              </div>
            </div>
            <div className="col-md-6">
              <form className="form-floating mb-0">
                <textarea className="form-control is-invalid" rows={3} placeholder="Leave a comment here" id="floatingTextarea21" defaultValue={"Invalid textarea"} />
                <label htmlFor="floatingTextarea21">Comments</label>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h5>Select</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="form-floating">
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                  <option selected>Open this select menu</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
                <label htmlFor="floatingSelect">Works with selects</label>
              </div>
            </div>
          </div>
          <h5 className="mt-3">Validation styles</h5>
          <hr />
          <div className="row g-4">
            <div className="col-md-6">
              <div className="form-floating mb-0">
                <select className="form-select is-valid" id="floatingselect1" aria-label="Floating label select example">
                  <option selected>Open this select menu</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
                <label htmlFor="floatingselect1">Comments</label>
              </div>
            </div>
            <div className="col-md-6">
              <form className="form-floating mb-0">
                <select className="form-select is-invalid" id="floatingselect2" aria-label="Floating label select example">
                  <option selected>Open this select menu</option>
                  <option value={1}>One</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                </select>
                <label htmlFor="floatingselect2">Comments</label>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Projects