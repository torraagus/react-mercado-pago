import React, { useState, useRef, useEffect, Fragment } from "react";
import Axios from "axios";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled from "styled-components";

const SubmitBtn = styled.input`
	background-color: #581b98;
	color: #faee1c;
	font-weight: bold;
	outline: none;
	border: none;
	text-transform: uppercase;
	height: 50px;
	width: 40%;
	align-self: center;
	text-indent: 0;
	border-radius: 15px;
	letter-spacing: 2px;
	margin-top: 2rem;

	-webkit-box-shadow: 10px 10px 5px 0px #651a1b31;
	-moz-box-shadow: 10px 10px 5px 0px #651a1b2f;
	box-shadow: 5px 5px 5px 0px #651a1b27;

	:hover {
		cursor: pointer;
		opacity: 90%;
	}

	@media (max-width: 512px) {
		margin-top: 1rem;
		width: 100%;
	}
`;

const Select = styled.select`
	height: 40px;
	text-indent: 0.25rem;
	letter-spacing: 1px;
`;

const Form = styled.form`
	width: 40%;
	display: ${(props) => (props.isVisible ? "none" : "flex")};
	flex-wrap: wrap;
	margin: 2rem 0 1rem 0;
	padding-bottom: 2rem;
	// justify-content: center;
	// background-color: tomato;

	@media (max-width: 1366px) {
		width: 60%;
	}

	@media (max-width: 1024px) {
		width: 70%;
	}

	@media (max-width: 768px) {
		width: 80%;
	}

	@media (max-width: 512px) {
		width: 90%;
		// height: 40vh;
		// overflow-y: auto;
	}
`;

const InputWrapper = styled.p`
	display: flex;
	flex-direction: column;
	text-align: left;
	width: 100%;
	margin: 0.5rem 0.25rem 0.5rem 0.25rem;

	@media (max-width: 2000px) {
		:nth-child(1),
		:nth-child(2) {
			width: 47%;
		}

		:nth-child(6),
		:nth-child(9) {
			width: 100%;
		}

		:nth-child(3),
		:nth-child(4),
		:nth-child(7) {
			width: 31%;
		}

		:nth-child(8) {
			width: 65%;
		}

		:nth-child(5) {
			width: 31%;
		}
	}

	@media (max-width: 768px) {
		width: 100%;

		:nth-child(3),
		:nth-child(4),
		:nth-child(7) {
			width: 31%;
		}

		:nth-child(8) {
			width: 65%;
		}

		:nth-child(5) {
			width: 31%;
		}
	}

	@media (max-width: 512px) {
		width: 100%;

		:nth-child(n) {
			width: 100%;
		}
	}
`;

const Input = styled.input`
	height: 34px;
	text-indent: 0.5rem;
	letter-spacing: 1px;

	:focus {
		outline: none;
		border: 1px solid #f3558e;
		border-bottom: 2px solid #9c1de7;
		border-left: 2px solid #9c1de7;
		background-color: #9d1de713;
	}
`;

const Label = styled.label`
	letter-spacing: 2px;
	margin-bottom: 0.5rem;
`;

const CardWrapper = styled.div`
	position: -webkit-sticky;
	position: sticky;
	top: 0;
	background-color: #581b98;
	width: 100vw;
	padding: 1rem 0 1rem 0;

	@media (min-width: 768px) {
		width: 75vw;
	}
`;

export const PaymentForm = ({
	amount,
	onProcessingPayment,
	onPaymentSuccess,
	onPaymentError,
}) => {
	// States
	const [options, setOptions] = useState([]);
	const [doSubmit, setDoSubmit] = useState(false);
	const [cardToken, setCardToken] = useState(null);
	const [focus, setFocus] = useState("");

	const [transactionAmount, setTransactionAmount] = useState(amount);
	const [cardNumber, setCardNumber] = useState("4509 9535 6623 3704");
	const [cardHolderName, setCardHolderName] = useState("");
	const [cardExpirationMonth, setCardExpirationMonth] = useState("11");
	const [cardExpirationYear, setCardExpirationYear] = useState("25");
	const [securityCode, setSecurityCode] = useState("123");
	const [docNumber, setDocNumber] = useState("");
	const [email, setEmail] = useState("");
	const [paymentMethodId, setPaymentMethodId] = useState("");
	const [installments, setInstallments] = useState(1);
	const [description, setDescription] = useState("Some product");
	const [paymentState, setPaymentState] = useState(null);

	// Refs
	const payFormRef = useRef(null);
	const focusRef = useRef(null);

	window.Mercadopago.setPublishableKey(
		"TEST-0dc15ecd-471b-4b8e-9591-7f7a5b8c8acd"
	);
	window.Mercadopago.getIdentificationTypes();

	useEffect(() => {
		if (cardNumber.length >= 6) {
			let bin = cardNumber.substring(0, 6);
			window.Mercadopago.getPaymentMethod(
				{
					bin: bin,
				},
				setPaymentMethod
			);
		}
	}, [cardNumber]);

	useEffect(() => {
		focusRef.current.focus();
	}, []);

	useEffect(() => {
		if (cardToken) processPayment();
	}, [cardToken]);

	useEffect(() => {
		if (paymentMethodId) getInstallments();
	}, [paymentMethodId]);

	useEffect(() => {
		setTransactionAmount(() => amount);
		if (paymentMethodId) getInstallments();
	}, [amount]);

	useEffect(() => {
		if (paymentMethodId) getInstallments();
	}, [transactionAmount]);

	const setPaymentMethod = (status, response) => {
		if (status === 200) {
			setPaymentMethodId(response[0].id);
		} else {
			alert(`payment method info error: ${response}`);
		}
	};

	const getInstallments = () => {
		window.Mercadopago.getInstallments(
			{
				payment_method_id: paymentMethodId,
				amount: parseFloat(transactionAmount),
			},
			(status, response) => {
				if (status === 200) {
					setOptions(() => response[0].payer_costs);
				} else {
					alert(`installments method info error: ${response}`);
				}
			}
		);
	};

	const doPay = (event) => {
		event.preventDefault();
		if (!doSubmit) {
			let $form = payFormRef.current;
			window.Mercadopago.createToken($form, sdkResponseHandler);
		}
	};

	const sdkResponseHandler = (status, response) => {
		if (status !== 200 && status !== 201) {
			alert("verify filled data");
		} else {
			setCardToken(response.id);
			setDoSubmit(true);
			onProcessingPayment();
		}
	};

	const processPayment = () => {
		Axios.post(
			"/procesar_pago",
			{
				transaction_amount: transactionAmount,
				token: cardToken,
				description,
				installments,
				payment_method_id: paymentMethodId,
				payer: {
					email,
				},
			},
			{
				"Content-Type": "application/json",
			}
		)
			.then((res) => {
				console.log(res.data);
				console.log(res.data.status);
				console.log(res.data.status_detail);
				setDoSubmit(false);
				setPaymentState(res.data.status);
				onPaymentSuccess(res.data.status);
			})
			.catch((err) => {
				console.log(err);
				onPaymentError(err);
				setDoSubmit(false);
			});
	};

	return (
		<>
			<CardWrapper>
				<Cards
					number={cardNumber}
					name={cardHolderName}
					expiry={`${cardExpirationMonth}${cardExpirationYear}`}
					cvc={securityCode}
					className="tarjeta"
					focused={focus}
				/>
			</CardWrapper>
			{paymentState && <p>The payment was {paymentState}</p>}
			<Form
				isVisible={doSubmit}
				ref={payFormRef}
				onSubmit={doPay}
				method="post"
				id="pay"
				name="pay"
			>
				{/* <p>
					<Label htmlFor="description">Descripción</Label>
					<Input
					type="text"
					name="description"
					id="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					/>
				</p> */}
				<InputWrapper>
					<Label htmlFor="cardNumber">Número de la tarjeta</Label>
					<Input
						ref={focusRef}
						type="text"
						id="cardNumber"
						name="number"
						data-checkout="cardNumber"
						autoComplete="off"
						onKeyUp={(e) => setCardNumber(e.target.value)}
						onChange={(e) => setCardNumber(e.target.value)}
						onFocus={(e) => setFocus(e.target.name)}
						value={cardNumber}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="cardholderName">Nombre y apellido</Label>
					<Input
						type="text"
						name="name"
						id="cardholderName"
						data-checkout="cardholderName"
						onChange={(e) => setCardHolderName(e.target.value)}
						onFocus={(e) => setFocus(e.target.name)}
						value={cardHolderName}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="cardExpirationMonth">Mes de vencimiento</Label>
					<Input
						type="text"
						id="cardExpirationMonth"
						name="expiry"
						data-checkout="cardExpirationMonth"
						autoComplete="off"
						onChange={(e) => setCardExpirationMonth(e.target.value)}
						onFocus={(e) => setFocus(e.target.name)}
						value={cardExpirationMonth}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="cardExpirationYear">Año de vencimiento</Label>
					<Input
						type="text"
						id="cardExpirationYear"
						name="expiry"
						data-checkout="cardExpirationYear"
						autoComplete="off"
						onChange={(e) => setCardExpirationYear(e.target.value)}
						onFocus={(e) => setFocus(e.target.name)}
						value={cardExpirationYear}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="securityCode">Código de seguridad</Label>
					<Input
						type="text"
						id="securityCode"
						name="cvc"
						data-checkout="securityCode"
						autoComplete="off"
						onChange={(e) => setSecurityCode(e.target.value)}
						onFocus={(e) => setFocus(e.target.name)}
						value={securityCode}
					/>
				</InputWrapper>
				{/* <p>
						<Label htmlFor="transaction_amount">Monto a pagar</Label>
						<Input
							name="transaction_amount"
							id="transaction_amount"
							type="number"
							value={transactionAmount}
							onChange={(e) =>
								setTransactionAmount(Number.parseInt(e.target.value))
							}
						/>
					</p> */}
				<InputWrapper>
					<Label htmlFor="installments">Cuotas</Label>
					<Select
						id="installments"
						className="form-control"
						name="installments"
						value={installments}
						onChange={(e) => setInstallments(Number.parseInt(e.target.value))}
					>
						{options.length > 0 &&
							options.map((opt, index) => (
								<option key={index} value={opt.installments}>
									{opt.recommended_message}
								</option>
							))}
					</Select>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="docType">Tipo de documento</Label>
					<Select id="docType" data-checkout="docType"></Select>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="docNumber">Número de documento</Label>
					<Input
						type="text"
						id="docNumber"
						data-checkout="docNumber"
						onChange={(e) => setDocNumber(e.target.value)}
						value={docNumber}
					/>
				</InputWrapper>
				<InputWrapper>
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						name="email"
						placeholder="your@email.com"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</InputWrapper>
				<Input
					type="hidden"
					name="payment_method_id"
					id="payment_method_id"
					value={paymentMethodId}
				/>
				<InputWrapper>
					<SubmitBtn type="submit" value="Pagar" />
				</InputWrapper>
			</Form>
		</>
	);
};
