'use client'

const style = `
    @keyframes progress {
        from {
            stroke-dasharray: 0 1400;
        }
        to {
            stroke-dasharray: 1257 1400;
        }
    }

    .loading-body{position: absolute;top: 0;left: 0;width: 100%;height: 100%;backdrop-filter: blur(5px);z-index: 9999;}
    .loading-main {width: 300px;height: 300px;}
    .progress {animation: progress 2s linear infinite;}
`

const Loading = () => {
    return (
        <>
            <style>{style}</style>

            <div className="loading-body d-flex justify-content-center align-items-center">
                <main className="loading-main">
                    <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" >
                        <circle className="progress" cx="400" cy="400" fill="none"
                            r="200" strokeWidth="30" stroke="#007BFF"
                            strokeDasharray="700 1400" />
                    </svg>
                </main>
            </div>
        </>
    )
}

export default Loading