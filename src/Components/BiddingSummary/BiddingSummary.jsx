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
import axios from 'axios';
import { ApiBaseUrl } from '../ApiBaseUrl';
import { toast } from 'react-hot-toast';
import { cartContext } from '../../context/CartContext';

export default function BiddingSummary({ product, SelectedVariant, RiAuctionLine , refetch }) {

  const user = localStorage.getItem("DaySooqUser") ;
  let headers = {
      'Authorization': `Bearer ${user}` 
  }

  const {addToCart} = useContext(cartContext);

  let navigate = useNavigate()
  const isBiddingEnded = new Date(product.endDate) < new Date();
  const {addToFav} = useContext(WishListContext)
  const minimumBidAmount = SelectedVariant?.current_price + product?.biddingGap;
  const [BidAmount, setBidAmount] = useState(minimumBidAmount);
  const [BidLoading, setBidLoading] = useState(false)
  const [Visible, setVisible] = useState(false);
  const [BuyNowVisible, setBuyNowVisible] = useState(false);

  let biddingSchema = Yup.object({
    amount :Yup.number().min(minimumBidAmount, `Bid amount must be at least ${minimumBidAmount}`)
    .required('Bid amount is required'),
  })

  const biddingOnProduct = async (val)=>{
    setBidLoading(true)
    try {
      let {data} = await axios.post(ApiBaseUrl + `biddings` , val , {headers})
      toast.success('Bidd Amount Added Successfully.', {
        className: 'first-z mt-5 bg-main-light ',
        duration: 2000,
    });
      refetch();
      setVisible(false)
      setBidLoading(false)
    } catch (error) {
      setBidLoading(false)
    }
  }
let Biddingformik = useFormik({
  initialValues: {
    amount: BidAmount,
    variant: SelectedVariant._id,
  },
  validationSchema: biddingSchema,
  onSubmit: (values) => {
    biddingOnProduct(values);
    setBidAmount(values.amount);
  },
});

const confirmPurchase = ()=>{
  setBidLoading(true)
  try {
    addToCart(SelectedVariant._id ,1)
    setBidLoading(false)
    setBuyNowVisible(false)  
  } catch (error) {
    setBidLoading(false)
  }
}

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
            <div className='ms-1 dark-grey-text'>
              Start Bidding : <span className='fw-bolder'>{isBiddingEnded
                ?<span className=''> Bidding Ended </span>
                :<span>{
                  product?.priceDiscount?.value > 0
                  ? product?.priceDiscount.type === 'percentage'
                    ? ((product.price + SelectedVariant?.extraPrice) - ((product.price + SelectedVariant?.extraPrice) * (product.priceDiscount.value / 100)))
                    : (product.price + SelectedVariant?.extraPrice - product.priceDiscount.value)
                  : (product.price + SelectedVariant?.extraPrice)} JOD 
                  </span>
                } 
            </span>
            </div>
          </h5>

          <h5 className='main-orange-text mb-3'>
            <span className='ms-1'>
              Highest Bid : <span className='fw-bolder'>{SelectedVariant?.current_price} JOD</span> <RiAuctionLine />
            </span>
          </h5>
          {!isBiddingEnded && (
            <button className='btn dark-blue-btn text-light rounded-pill w-100 py-2 fs-5' onClick={() => setBuyNowVisible(true)} disabled={isBiddingEnded}>
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
                    className=" mb-2 form-control"
                    name="amount"
                    value={Biddingformik.values.amount}
                    onChange={Biddingformik.handleChange}
                    onBlur={Biddingformik.handleBlur}
                  />
                  <p className='main-orange-text'>** Amount Have to be more than <span className='dark-blue-text'>{minimumBidAmount - 0.1}</span> JOD</p>
                  {Biddingformik.errors.amount && Biddingformik.touched.amount ?<div className="alert alert-danger py-1">{Biddingformik.errors.amount}</div>: null} 
                  {BidLoading ? 
                    <button type="button" className='btn btn-orange rounded-pill text-light me-2 w-100'><i className=' fa fa-spin fa-spinner'></i></button>
                    :
                    <button type="submit" className="btn btn-orange rounded-pill w-100" disabled={Biddingformik.errors.amount || Biddingformik.values.amount < minimumBidAmount}>
                      Bid Now <RiAuctionLine/>
                    </button>
                }
                </form>
              </div>
            </>}
            {!user && <>
              <h6>You aren't logged in. Please log in and try again.</h6> 
              <button className='btn-orange rounded py-2 px-3' onClick={()=>navigate('/Authorization')}>Go to Login  <AiOutlineLogin size={22}  className="ms-1" /></button>
            </>
            }
        </div>
      </Dialog>
      <Dialog visible={BuyNowVisible} onHide={() => setBuyNowVisible(false)} style={{ width: 'fit-content' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
      <div className="dialogContainer px-5 d-flex flex-column justify-content-around align-items-center h-100">
        <h6 className='fw-bolder main-orange-text'>
          Purchase Confirmation
        </h6>
        <p>
          By confirming your purchase, this product will be added to your cart, and the bidding process will be set to pending.
        </p>
        <p>
          purchase this product for <span className='fw-bolder'>{product.biddingPrice} JOD</span>.
        </p>
        {BidLoading ? 
          <button type="button" className='btn dark-blue-btn rounded-pill px-5 mb-2 text-light'><i className=' fa fa-spin fa-spinner'></i></button>
                    :
          <button className='btn dark-blue-btn rounded-pill px-5 mb-2 text-light' onClick={confirmPurchase}>Confirm Purchase <IoBagCheck /></button>
        }
        <p className='fs-6 light-red-text '>
          NOTE: The bidding will not end until you Place the order.
        </p>

      </div>
      </Dialog>
    </>
  );
}
