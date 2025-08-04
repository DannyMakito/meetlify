import React from 'react'

const Meeting = ({ params }: { params: { id: string } }) => {
  return (
    <main>
 Meeting room :# {params.id} 
    </main>
    
  )
}

export default Meeting
