import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { PaymentForm } from "./components/payment/PaymentForm";
import { Products } from "./components/products/Products";
import { useScroller } from "./hooks/useScroller";
import { Title, Subtitle } from "./components/shared/shared.styles";

function App() {
	const [paymentVisible, setPaymentVisible] = useState(false);
	const [processingPayment, setProcessingPayment] = useState(false);
	const [paymentState, setPaymentState] = useState(null);
	const [paymentErr, setPaymentErr] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const { scrollTo } = useScroller();

	const payTitleRef = useRef(null);

	const handleOnProductSelected = (product) => {
		if (paymentVisible) scrollTo(payTitleRef.current.offsetTop);
		setPaymentVisible(true);
		setSelectedProduct(() => product);
	};

	const handleOnProcessingPayment = () => {
		setProcessingPayment(true);
		setPaymentErr(null);
		setPaymentState(null);
	};

	const handleOnPaymentSuccess = (state) => {
		setPaymentState(state);
	};

	const handleOnPaymentError = (err) => {
		setPaymentErr(`${err}`);
	};

	useEffect(() => {
		setTimeout(() => {
			if (paymentVisible) scrollTo(payTitleRef.current.offsetTop);
		}, 0);
	}, [paymentVisible, scrollTo]);

	return (
		<div className="App">
			{!processingPayment && (
				<>
					<Title>Select a product</Title>
					<Products onProductSelected={handleOnProductSelected} />
				</>
			)}
			{paymentVisible && !processingPayment && (
				<>
					<Title ref={payTitleRef}>Pay product</Title>
					<Subtitle>{selectedProduct?.desc}</Subtitle>
					<PaymentForm
						product={selectedProduct}
						onProcessingPayment={handleOnProcessingPayment}
						onPaymentSuccess={handleOnPaymentSuccess}
						onPaymentError={handleOnPaymentError}
					></PaymentForm>
				</>
			)}
			{processingPayment && (
				<div>
					{!paymentErr && !paymentState && <p>Procesando pago...</p>}
					{paymentErr && <p>Error: {paymentErr}</p>}
					{paymentState && <p>Your payment was {paymentState}</p>}
					{(paymentErr || paymentState) && (
						<button
							onClick={() => {
								window.location.reload(false);
							}}
						>
							Reload!
						</button>
					)}
				</div>
			)}
		</div>
	);
}

export default App;
