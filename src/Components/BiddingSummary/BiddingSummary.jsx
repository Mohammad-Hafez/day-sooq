import React , {useContext, useState}from 'react';
import { IoBagCheck } from "react-icons/io5";
import {heart} from 'react-icons-kit/ionicons/heart'
import { Icon } from 'react-icons-kit'
import { WishListContext } from '../../context/WishListContext'
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogin } from "react-icons/ai";
import CountdownTimer from '../Countdown/Countdown';
import * as Yup from 'yup'
import {  useFormik } from 'formik'

export default function BiddingSummary({ product, SelectedVariant, RiAuctionLine }) {

  let user = localStorage.getItem('DaySooqUser')
  let navigate = useNavigate()
  const [Visible, setVisible] = useState(false);
  const minimumBidAmount = SelectedVariant?.current_price + product?.biddingGap;
  const [BidAmount, setBidAmount] = useState(minimumBidAmount);

  const isBiddingEnded = new Date(product.endDate) < new Date();

  const {addToFav} = useContext(WishListContext)

  let biddingSchema = Yup.object({
    amount :Yup.number().required('Bid amount is required'),
  })

let Biddingformik = useFormik({
  initialValues: {
    amount: BidAmount,
    variant: SelectedVariant._id,
  },
  validationSchema: biddingSchema,
  onSubmit: (values) => {
    console.log(values);
    setBidAmount(values.amount);
  },
});


  return (
    <>
      <div className="p-summary">
        <div className="brdr p-3 d-flex flex-column align-items-start justify-content-start font-Poppins mb-3">
          <div className="delivery d-flex align-items-center justify-content-between w-100 mb-3">
            <p className='m-0 light-grey-text'>Delivery :</p>
            <div className="free-badge light-gtreen-bg px-2 rounded-pill">
              <span className=''>free</span>
            </div>
          </div>
          <button onClick={()=> addToFav(product._id)} className='w-100 grey-outline-btn cursor-pointer mb-4 py-2 fs-5 d-flex align-items-center justify-content-center addToFavBtn'>Wishlist <Icon className='heart ms-2' icon={heart} size={22}></Icon></button>
          <h5 className='main-grey-text mb-3'>
            <span className='ms-1 dark-grey-text'>
              Start Bidding : <span className='fw-bolder'>{isBiddingEnded
                ? "Bidding Ended"
                : product?.priceDiscount?.value > 0
                  ? product?.priceDiscount.type === 'percentage'
                    ? ((product.price + SelectedVariant?.extraPrice) - ((product.price + SelectedVariant?.extraPrice) * (product.priceDiscount.value / 100)))
                    : (product.price + SelectedVariant?.extraPrice - product.priceDiscount.value)
                  : (product.price + SelectedVariant?.extraPrice)} JOD </span>
            </span>
          </h5>

          <h5 className='main-orange-text mb-3'>
            <span className='ms-1'>
              Highest Bid : <span className='fw-bolder'>{SelectedVariant?.current_price} JOD</span> <RiAuctionLine />
            </span>
          </h5>
          {!isBiddingEnded && (
            <button className='btn dark-blue-btn text-light rounded-pill w-100 py-2 fs-5' onClick={() => console.log("hii")} disabled={isBiddingEnded}>
              Buy It Now <IoBagCheck />
            </button>
          )}
        </div>
        <button className='btn btn-orange rounded-pill w-100 py-2 fs-5' onClick={() => setVisible(true)} disabled={isBiddingEnded}>
          Bid Now <RiAuctionLine />
        </button>
        {!isBiddingEnded &&
        <h6><CountdownTimer endDate={product?.endDate}/></h6>
        }
      </div>
      <Dialog visible={Visible} onHide={() => setVisible(false)} style={{ width: 'fit-content' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
        <div className="dialogContainer px-5 d-flex flex-column justify-content-around align-items-center h-100">
            {user && <>
              <div className="createBid">
                <h6 className='dark-blue-text fs-5'>Enter Bidd Amount</h6>
                <form onSubmit={Biddingformik.handleSubmit}>
                  <input
                    type="number"
                    placeholder="Bid Amount"
                    className="AuthForm-inputs mb-2 form-control"
                    name="amount"
                    value={Biddingformik.values.amount}
                    onChange={Biddingformik.handleChange}
                    onBlur={Biddingformik.handleBlur}
                  />
                  {Biddingformik.errors.amount && Biddingformik.touched.amount ?<div className="alert alert-danger">{Biddingformik.errors.amount}</div>: null} 
                  <button type="submit" className="btn btn-outline-primary">Bid Now</button>
                </form>
              </div>
            </>}
            {!user && <>
              <h5>Goto login</h5> 
              <button className='btn-orange rounded py-2 px-3' onClick={()=>navigate('/Authorization')}>Go to Login  <AiOutlineLogin size={22}  className="ms-1" /></button>
            </>
            }
        </div>
      </Dialog>
    </>
  );
}
