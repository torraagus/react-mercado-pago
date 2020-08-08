import React, { useState } from "react";
import "./App.css";
import { PaymentForm } from "./components/payment/PaymentForm";
import styled from "styled-components";
import { Products } from "./components/products/Products";

const Title = styled.h1`
	color: #581b98;
	margin: 2rem 0 0 0;
`;

const Subtitle = styled.p`
	color: #f3558e;
	letter-spacing: 3px;
	margin: 0;
	margin-bottom: 2rem;
`;

function App() {
	const [paymentVisible, setPaymentVisible] = useState(false);
	const [processingPayment, setProcessingPayment] = useState(false);
	const [paymentState, setPaymentState] = useState(null);
	const [paymentErr, setPaymentErr] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleOnProductSelected = (product) => {
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
		// setProcessingPayment(false);
	};

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
					<Title>Pay product</Title>
					<Subtitle>{selectedProduct?.desc}</Subtitle>
					<PaymentForm
						amount={selectedProduct?.price}
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
