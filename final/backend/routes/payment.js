const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const Str = require('@supercharge/strings');

router.post('/pretransaction', async (req, res)=> {
    try{
        console.log(req.body, "req.body");
        const { name, email, phone, address, pincode, amount } = req.body;

        let orderData = {
            id: "933095u09",
            amount: {value: amount * 100, currency: "INR"},
            status: "created",
            paymentMode: "online",
            agent: "razorpay",
            name: name,
            email: email ,
            phone: phone ,
            address: address ,
            pincode: pincode 
        };
        const data = await Order.create(orderData);
        console.log(data);
        res.json({
            "statusCode": "Code Successful",
            "message": "Payment Initiated !!",
            "_id": orderData._id,
            "status": "created",
            "Amount": orderData.amount.value / 100
        });
    
    }catch(error){
      console.error(error.message);
      res.status(500).send("internal server Error occured");
    }
    })

// const markAsPaid = async (req, res) => {
//     LoggerOutput.info('Trying to Initialize the Payment');
//     try {
//         const { orgId, _id, verifiedBy, description } = req.body;
//         const paymentData = await PaymentDao.updatePayment({ "orgId": orgId, "_id": _id });

//         res.json({
//             "statusCode": config.CONSTANT.HTTP_STATUS_CODE.OK,
//             "message": "Payment completed !!",
//             "orgId": orgId,
//             "_id": paymentData.id,
//             "phone": paymentData.phone,
//             "currency": paymentData.currency,
//             "paymentMode": paymentData.paymentMode
//         });
//     } catch (error) {
//         logger.log({
//             level: 'error',
//             message: `mark as paid api call failed`,
//             error: error,
//         });
//         console.log(error);
//         return sendError({ "statusCode": config.CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST, "message": `mark as paid api call failed!`, "details": error });
//     }
// };

// const generateRazorpayLink = async (req, res) => {
//     try {
//         const razorpayInstance = new Razorpay({
//             key_id: config.SERVER.razorpay_app_key,
//             key_secret: config.SERVER.razorpay_secret_key
//         });

//         let paymentDetail = await PaymentDao.findOrderDetail({ "orgId": req.body.orgId, "orderId": req.body._id });
//         let amount = paymentDetail.amount.value;
//         let currency = paymentDetail.amount.currency;
//         let name = "abcde";
//         let email = "abfddadfm34@gmail.com";
//         let phone = "9129881798";
//         let reference_id = req.body._id;
//         let smartsevakRegId = paymentDetail.notes.JJS.smartsevakRegId;
//         let coverWellRegId = paymentDetail.notes.JJS.coverWellRegId;
        
//         const data = await razorpayInstance.paymentLink.create({
//             amount: amount,
//             currency: currency,
//             accept_partial: false,
//             reference_id: reference_id,
//             first_min_partial_amount: 0,
//             description: "description",
//             customer: {
//                 name: name,
//                 email: email,
//                 contact: phone
//             },
//             notify: {
//                 sms: true,
//                 email: true
//             },
//             reminder_enable: true,
//             notes: {
//                 policy_name: "Smartsevak default",
//                 smartsevakRegId: smartsevakRegId,
//                 coverWellRegId: coverWellRegId
//             },
//             callback_url: "https://9320-125-21-2-218.in.ngrok.io/api/v1/paymentInitiated",
//             callback_method: "get"
//         });
//         if(data.status==="created")
//         {
//         const paymentData = await PaymentDao.updatePaymentProgress({ "_id": req.body._id, "generatedLink": data.short_url, "expiresOn": data.expired_at, "paylink_id": data.id });
//         res.json({
//             "statusCode": config.CONSTANT.HTTP_STATUS_CODE.OK,
//             "message": "Payment Initiated !!",
//             "_id": req.body._id,
//             "link": data.short_url,
//             "amount": paymentDetail.amount,
//             "currency": paymentDetail.currency
//         });
//     }
//     else
//     {
//         return sendError({ "statusCode": config.CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST, "message": `Failed to generate Payment Link. Please try after sometime.`});
//     }
//     }
//     catch (error) {
//         logger.log({
//             level: 'error',
//             message: `Generate razorpay link api call failed`,
//             error: error,
//         });
//         console.log(error);
//         return sendError({ "statusCode": config.CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST, "message": `generate razorpay link api call failed!`, "details": error });
//     }
// }

// const checkTransacionStatus = async (req, res) => {
//     try {
//         let transactionStatus = await PaymentDao.checkStatus({ "_id": req.query._id });
//         res.json({
//             "statusCode": config.CONSTANT.HTTP_STATUS_CODE.OK,
//             "message": "Payment Initiated !!",
//             "_id": req.query._id,
//             "paymentStatus ": transactionStatus.payment_status
//         });
//     }
//     catch (error) {
//         logger.log({
//             level: 'error',
//             message: `check transaction satatus api call failed`,
//             error: error,
//         });
//         console.log(error);
//         return sendError({ "statusCode": config.CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST, "message": `check transaction satatus api call failed!`, "details": error });

//     }
// }

// const listAllTransactions = async (req, res) => {
//     try {
//         let allTransaction = await PaymentDao.AllTransactions({ "organizationId": req.query.organizationId });
//         res.json({
//             "statusCode": config.CONSTANT.HTTP_STATUS_CODE.OK,
//             "message": "Payment Initiated !!",
//             "_id": req.query._id,
//             "allTransaction ": allTransaction
//         });
//     }
//     catch (error) {
//         logger.log({
//             level: 'error',
//             message: `list all transaction api call failed`,
//             error: error,
//         });
//         console.log(error);
//         return sendError({ "statusCode": config.CONSTANT.HTTP_STATUS_CODE.BAD_REQUEST, "message": `list all transaction api call failed!`, "details": error });

//     }
// }

// const paymentInitiated = async (req, res) => {
//     let pay_id = req.query.razorpay_payment_id;
//     let paylink_id = req.query.razorpay_payment_link_id;
//     let status= req.query.razorpay_payment_link_status;
//     let reference_id = req.query.razorpay_payment_link_reference_id;
//     try {
//         const paymentData = await PaymentDao.initiatePayment({ "pay_id": pay_id, "paylink_id": paylink_id, "status": status, "reference_id": reference_id });
//         return sendSuccess({
//             "statusCode": config.CONSTANT.HTTP_STATUS_CODE.OK,
//             "success": true,
//             "message": "Successfully completed payment!"
//         });
//     } catch (error) {
//         console.log('Error handling callback', error);
//     }
// };

// const razorpayCallbackWebhook = async (req, res) => {
    
//     try {
//         LoggerOutput.info('Received response:');

//         var key = config.SERVER.razorpay_webhook_secret_key;
//         console.log(req.body.payload.payment.entity.id,"paymentID");

//         var message = req.rawHeaders;
//         const received_signature = req.headers['x-razorpay-signature'];

//         console.log(Razorpay.validateWebhookSignature(JSON.stringify(req.body), received_signature, "12345"),"yes");
//         if(Razorpay.validateWebhookSignature(JSON.stringify(req.body), received_signature, "12345")){
//           await PaymentDao.capturePayment({ "paymentId": req.body.payload.payment.entity.id });
//           res.status(200).send("ok"); //this is to send the webhook ok response, so that the webhook doesn't shutdown.
//         //   const json_resp = JSON.parse(req.rawBody);
//         //   console.log("json_resp", json_resp);
//         }
//         else{
//            console.log("error: Signature is not verified");
//         }
//     } catch (error) {
//         console.log('Error handling callback', error);
//     }
// };

module.exports = router