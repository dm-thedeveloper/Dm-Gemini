import React from 'react'

const Loading = () => {
  return (
    <section className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 overflow-hidden flex justify-center items-center ">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="w-[150px] h-[150px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 shadow-2xl overflow-hidden">
        <video
          src="/logo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </section>
  )
}

export default Loading
