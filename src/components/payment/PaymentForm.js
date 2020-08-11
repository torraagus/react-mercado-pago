import React, { useState, useRef, useEffect, Fragment } from "react";
import Axios from "axios";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import {
	CardWrapper,
	InputWrapper,
	SubmitBtn,
	Form,
	Input,
	Label,
	Select,
	ErrorWrapper,
	Error,
	ErrorMessage,
	ErrorList,
	ErrorCause,
	CauseDescription,
} from "./paymentForm.styles";
import { MdErrorOutline } from "react-icons/md";
require("dotenv").config();

export const PaymentForm = ({
	product,
	onProcessingPayment,
	onPaymentSuccess,
	onPaymentError,
}) => {
	// States
	const [options, setOptions] = useState([]);
	const [doSubmit, setDoSubmit] = useState(false);
	const [cardToken, setCardToken] = useState(null);
	const [error, setError] = useState(null);
	const [focus, setFocus] = useState("");

	const [transactionAmount, setTransactionAmount] = useState(product.price);
	const [cardNumber, setCardNumber] = useState("4509 9535 6623 3704");
	const [cardHolderName, setCardHolderName] = useState("");
	const [cardExpirationMonth, setCardExpirationMonth] = useState("11");
	const [cardExpirationYear, setCardExpirationYear] = useState("25");
	const [securityCode, setSecurityCode] = useState("123");
	const [docNumber, setDocNumber] = useState("");
	const [email, setEmail] = useState("");
	const [paymentMethodId, setPaymentMethodId] = useState("");
	const [installments, setInstallments] = useState(1);
	const [paymentState, setPaymentState] = useState(null);

	// Refs
	const payFormRef = useRef(null);
	const focusRef = useRef(null);

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
		window.Mercadopago.setPublishableKey(process.env.REACT_APP_PUBLIC_KEY);
		window.Mercadopago.getIdentificationTypes();
		focusRef.current.focus();
	}, []);

	useEffect(() => {
		if (cardToken) processPayment();
	}, [cardToken]);

	useEffect(() => {
		if (paymentMethodId) getInstallments();
	}, [paymentMethodId, transactionAmount]);

	useEffect(() => {
		setTransactionAmount(() => product.price);
		if (paymentMethodId) getInstallments();
	}, [product]);

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
			//alert("verify filled data");
			console.log(response);
			setError(response);
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
				description: "Some product",
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
				setDoSubmit(false);
				setPaymentState(res.data.status);
				onPaymentSuccess(res.data.status);
			})
			.catch((err) => {
				console.log(`${err}`);
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
			{error && (
				<ErrorWrapper>
					<Error>
						<MdErrorOutline size={28} style={{ "margin-right": ".5rem" }} />
						{error.error}
					</Error>
					<ErrorMessage>{error.message}</ErrorMessage>
					<ErrorList>
						{error.cause.length > 0 &&
							error.cause.map((cause) => (
								<ErrorCause>
									(Cod. {cause.code}) -{" "}
									<CauseDescription>{cause.description}.</CauseDescription>
								</ErrorCause>
							))}
					</ErrorList>
				</ErrorWrapper>
			)}
			<Form
				isVisible={doSubmit}
				ref={payFormRef}
				onSubmit={doPay}
				method="post"
				id="pay"
				name="pay"
			>
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
						type="number"
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
						type="number"
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
						type="number"
						id="securityCode"
						name="cvc"
						data-checkout="securityCode"
						autoComplete="off"
						onChange={(e) => setSecurityCode(e.target.value)}
						onFocus={(e) => setFocus(e.target.name)}
						value={securityCode}
					/>
				</InputWrapper>
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
						type="number"
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
				<InputWrapper>
					<SubmitBtn type="submit" value="Pagar" />
				</InputWrapper>
			</Form>
		</>
	);
};
