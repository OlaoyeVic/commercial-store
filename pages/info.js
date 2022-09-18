import styles from '../styles/app.module.css'
import { PaystackButton } from 'react-paystack'
import { useState } from 'react'
import { useRouter } from 'next/router'

const OrderInfo = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_SHARABLE_KEY

    const totalAmount = parseInt(localStorage.getItem('amount'))

    const handleSubmit = (event) => {
        event.preventDefault()
        // const { name, email } = event.target.elements
    }

    const componentProps = {
        email,
        amount: totalAmount * 100,
        metadata: {
            name,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () => {
            setEmail("")
            setName("")
            router.push('/')
        },
        onClose: () => alert("Are you sure you want to go back?"),
    }
    return (
        <div className={styles.container}>
            <h1 style={{color: 'black', marginBottom: '50px', fontWeight: 'bold', fontSize: '28px'}}>Order Information</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input type="text" id='name' name="name" value={name} onChange={(e) => setName(e.target.value)} />
                
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}  />

                {/* <button type='submit'>Submit</button> */}
                <PaystackButton style={{color: 'green', backgroundColor: 'red'}}className='button' {...componentProps} />
            </form>
        </div>
    )
}
export default OrderInfo