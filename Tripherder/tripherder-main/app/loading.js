import React from 'react'

const loading = () => {
    return (
        <div className="content-container">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <div class="d-flex align-items-center justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default loading;