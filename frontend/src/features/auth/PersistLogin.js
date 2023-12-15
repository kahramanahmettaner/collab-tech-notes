import { Outlet, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authApiSlice'

const persistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation()

    // isSuccess status can be successful before the credentials set in useEffect
    // That's why we need an extra state here
    const [trueSuccess, setTrueSuccess] = useState(false)

    useEffect(() => {

        // React 18 Strict Mode (enabled only in development)
        // In React 18 Strict Mode, each component undergoes double mounting and unmounting during development.
        // This leads to useEffect running twice in development when using strict mode.
        // The variable effectRan will be true only during the second execution.
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { 
            
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    const response = await refresh()
                    // const { accessToken } = response.data
                    setTrueSuccess(true)
                } catch (err) {
                    console.error(err)
                }
            }

            if (!token && persist) verifyRefreshToken()
        }
        
        return () => effectRan.current = true

        // The line below removes some warnings related to the dependecy array for useEffect
        // eslint-disable-next-line
    }, [])

    let content
    
    // persist: yes
    if (!persist) { 
        console.log('no persist')
        content = <Outlet />
    } 
    // persist: yes, token: no
    else if (isLoading) { 
        console.log('loading')
        content = <p>Loading...</p>
    }
    // persist: yes, token: no
    else if (isError) { 
        console.log('error')
        content = (
            <p className='errmsg'>
                {error.data?.message}
                <Link to='/login'>Please login again</Link>    
            </p>
        )
    }
    // persist: yes, token: yes
    else if (isSuccess && trueSuccess) { 
        console.log('success')
        content = <Outlet />
    }
    // persist: yes, token: yes
    else if (token && isUninitialized) { 
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }


    return content
}

export default persistLogin
