import React from 'react'

function ProtectedRoute({children}) {
    const user  = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
        {user ? <>{children}</> : <Navigate to="/login" />}
    </div>
  )
}

export default ProtectedRoute