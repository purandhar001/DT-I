import React,{useState} from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from './context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'


export default function 
() {

    const [error, setError] = useState('')
    const {currentUser, signout} = useAuth()
    const navigate = useNavigate()

    async function handleSignOut(){
        setError('')

        try{
            await signout()
            navigate('/CourseConnect/signin')
        }catch{
            setError('Failed to sign out')
        }
    }


  return (
    <>
    <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email:</strong>{currentUser.email}
            <Link to="/update-profile" className='btn btn-primary w-100'>
                Update Profile
            </Link>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
                <Button variant='link' onClick={handleSignOut}>
                    Sign Out
                </Button>
    </div>
    </>
  )
}
