import React, { useState, useRef, useEffect } from "react";
import Axios from "axios";

export const PaymentForm = () => {
	const [options, setOptions] = useState([]);
	const [doSubmit, setDoSubmit] = useState(false);
	const [cardToken, setCardToken] = useState(null);

	const [transactionAmount, setTransactionAmount] = useState(100);
	const [cardNumber, setCardNumber] = useState("");
	const [cardHolderName, setCardHolderName] = useState("");
	const [cardExpirationMonth, setCardExpirationMonth] = useState("");
	const [cardExpirationYear, setCardExpirationYear] = useState("");
	const [securityCode, setSecurityCode] = useState("");
	const [docNumber, setDocNumber] = useState("");
	const [email, setEmail] = useState("");
	const [paymentMethodId, setPaymentMethodId] = useState("");
	const [installments, setInstallments] = useState(1);
	const [description, setDescription] = useState("Some item");

	const payFormRef = useRef(null);

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
		if (cardToken) processPayment();
	}, [cardToken]);

	useEffect(() => {
		if (paymentMethodId) getInstallments();
	}, [paymentMethodId]);

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
				setDoSubmit(false);
			})
			.catch((err) => {
				console.log(err);
				setDoSubmit(false);
			});
	};

	return (
		<form ref={payFormRef} onSubmit={doPay} method="post" id="pay" name="pay">
			<fieldset>
				<p>
					<label htmlFor="description">Descripción</label>
					<input
						type="text"
						name="description"
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</p>
				<p>
					<label htmlFor="transaction_amount">Monto a pagar</label>
					<input
						name="transaction_amount"
						id="transaction_amount"
						type="number"
						value={transactionAmount}
						onChange={(e) =>
							setTransactionAmount(Number.parseInt(e.target.value))
						}
					/>
				</p>
				<p>
					<label htmlFor="cardNumber">Número de la tarjeta</label>
					<input
						type="text"
						id="cardNumber"
						data-checkout="cardNumber"
						autoComplete="off"
						onKeyUp={(e) => setCardNumber(e.target.value)}
						onChange={(e) => setCardNumber(e.target.value)}
						value={cardNumber}
					/>
				</p>
				<p>
					<label htmlFor="cardholderName">Nombre y apellido</label>
					<input
						type="text"
						id="cardholderName"
						data-checkout="cardholderName"
						onChange={(e) => setCardHolderName(e.target.value)}
						value={cardHolderName}
					/>
				</p>
				<p>
					<label htmlFor="cardExpirationMonth">Mes de vencimiento</label>
					<input
						type="text"
						id="cardExpirationMonth"
						data-checkout="cardExpirationMonth"
						autoComplete="off"
						onChange={(e) => setCardExpirationMonth(e.target.value)}
						value={cardExpirationMonth}
					/>
				</p>
				<p>
					<label htmlFor="cardExpirationYear">Año de vencimiento</label>
					<input
						type="text"
						id="cardExpirationYear"
						data-checkout="cardExpirationYear"
						autoComplete="off"
						onChange={(e) => setCardExpirationYear(e.target.value)}
						value={cardExpirationYear}
					/>
				</p>
				<p>
					<label htmlFor="securityCode">Código de seguridad</label>
					<input
						type="text"
						id="securityCode"
						data-checkout="securityCode"
						autoComplete="off"
						onChange={(e) => setSecurityCode(e.target.value)}
						value={securityCode}
					/>
				</p>
				<p>
					<label htmlFor="installments">Cuotas</label>
					<select
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
					</select>
				</p>
				<p>
					<label htmlFor="docType">Tipo de documento</label>
					<select id="docType" data-checkout="docType"></select>
				</p>
				<p>
					<label htmlFor="docNumber">Número de documento</label>
					<input
						type="text"
						id="docNumber"
						data-checkout="docNumber"
						onChange={(e) => setDocNumber(e.target.value)}
						value={docNumber}
					/>
				</p>
				<p>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="your@email.com"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</p>
				<input
					type="hidden"
					name="payment_method_id"
					id="payment_method_id"
					value={paymentMethodId}
				/>
				<input type="submit" value="Pagar" />
			</fieldset>
		</form>
	);
};
