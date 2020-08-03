import React, { useState, useRef } from "react";

/*
    QUEDE EN INTEGRAR DATOS DE TARJETA PASO 4!

    Esta practicamente terminado
*/

export const PaymentForm = () => {
  const [options, setOptions] = useState([]);
  const [doSubmit, setDoSubmit] = useState(false);
  const [cardToken, setCardToken] = useState(null);
  const payFormRef = useRef(null);
  const cardNumRef = useRef(null);
  const paymentIdRef = useRef(null);
  const transAmountRef = useRef(null);
  const installmentsRef = useRef(null);

  window.Mercadopago.setPublishableKey(
    "TEST-0dc15ecd-471b-4b8e-9591-7f7a5b8c8acd"
  );
  window.Mercadopago.getIdentificationTypes();

  const handleEvent = () => {
    // let cardnumber = document.getElementById("cardNumber").value;
    let cardnumber = cardNumRef.current.value;
    console.log(cardnumber);

    if (cardnumber.length >= 6) {
      let bin = cardnumber.substring(0, 6);
      window.Mercadopago.getPaymentMethod(
        {
          bin: bin,
        },
        setPaymentMethod
      );
    }
  };

  const setPaymentMethod = (status, response) => {
    console.log(status, "Status");
    console.log(response, "Response");
    if (status === 200) {
      let paymentMethodId = response[0].id;
      //   let element = document.getElementById("payment_method_id");
      let element = paymentIdRef.current;
      element.value = paymentMethodId;
      getInstallments();
    } else {
      alert(`payment method info error: ${response}`);
    }
  };

  const getInstallments = () => {
    window.Mercadopago.getInstallments(
      {
        // payment_method_id: document.getElementById("payment_method_id").value,
        payment_method_id: paymentIdRef.current.value,
        amount: parseFloat(transAmountRef.current.value),
        // amount: parseFloat(document.getElementById("transaction_amount").value),
      },
      (status, response) => {
        console.log(response[0], "Response ins");
        if (status === 200) {
          //   document.getElementById("installments").options.length = 0;
          //   installmentsRef.current.length = 0;
          setOptions(() => response[0].payer_costs);
          //   response[0].payer_costs.forEach((installment) => {
          //     let opt = document.createElement("option");
          //     opt.text = installment.recommended_message;
          //     opt.value = installment.installments;
          //     document.getElementById("installments").appendChild(opt);
          //   });
        } else {
          alert(`installments method info error: ${response}`);
        }
      }
    );
  };

  // doSubmit = false;
  // document.querySelector("#pay").addEventListener("submit", doPay);

  const doPay = (event) => {
    event.preventDefault();
    if (!doSubmit) {
      // var $form = document.querySelector("#pay");
      let $form = payFormRef.current;

      window.Mercadopago.createToken($form, sdkResponseHandler);

      return false;
    }
  };

  function sdkResponseHandler(status, response) {
    console.log(status, "status");
    console.log(response?.cause);
    if (status !== 200 && status !== 201) {
      alert("verify filled data");
    } else {
      // var form = document.querySelector("#pay");
      let form = payFormRef.current;
      // var card = document.createElement("input");
      // card.setAttribute("name", "token");
      // card.setAttribute("type", "hidden");
      // card.setAttribute("value", response.id);
      setCardToken(<input name="token" type="hidden" value={response.id} />)
      // form.appendChild(card);
      // doSubmit = true;
      setDoSubmit(true);
      // form.submit();
    }
  }

  return (
    <>
      {/* {JSON.stringify(options)} */}
      <form
        ref={payFormRef}
        onSubmit={doPay}
        action="/procesar_pago.php"
        method="post"
        id="pay"
        name="pay"
      >
        <fieldset>
          <p>
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              name="description"
              id="description"
              defaultValue="Item seleccionado"
              onChange={null}
              // value="Ítem seleccionado"
            />
          </p>
          <p>
            <label htmlFor="transaction_amount">Monto a pagar</label>
            <input
              ref={transAmountRef}
              name="transaction_amount"
              id="transaction_amount"
              value="100"
            />
          </p>
          <p>
            <label htmlFor="cardNumber">Número de la tarjeta</label>
            <input
              ref={cardNumRef}
              type="text"
              id="cardNumber"
              data-checkout="cardNumber"
              // onSelectStart="return false"
              // onPaste="return false"
              // onCopy="return false"
              // onCut="return false"
              // onDrag="return false"
              // onDrop="return false"
              autoComplete="off"
              onKeyUp={handleEvent}
              onChange={handleEvent}
            />
          </p>
          <p>
            <label htmlFor="cardholderName">Nombre y apellido</label>
            <input
              type="text"
              id="cardholderName"
              data-checkout="cardholderName"
            />
          </p>
          <p>
            <label htmlFor="cardExpirationMonth">Mes de vencimiento</label>
            <input
              type="text"
              id="cardExpirationMonth"
              data-checkout="cardExpirationMonth"
              // onSelectstart="return false"
              // onPaste="return false"
              // onCopy="return false"
              // onCut="return false"
              // onDrag="return false"
              // onDrop="return false"
              autoComplete="off"
            />
          </p>
          <p>
            <label htmlFor="cardExpirationYear">Año de vencimiento</label>
            <input
              type="text"
              id="cardExpirationYear"
              data-checkout="cardExpirationYear"
              // onSelectstart="return false"
              // onPaste="return false"
              // onCopy="return false"
              // onCut="return false"
              // onDrag="return false"
              // onDrop="return false"
              autoComplete="off"
            />
          </p>
          <p>
            <label htmlFor="securityCode">Código de seguridad</label>
            <input
              type="text"
              id="securityCode"
              data-checkout="securityCode"
              // onSelectstart="return false"
              // onPaste="return false"
              // onCopy="return false"
              // onCut="return false"
              // onDrag="return false"
              // onDrop="return false"
              autoComplete="off"
            />
          </p>
          <p>
            <label htmlFor="installments">Cuotas</label>
            <select
              ref={installmentsRef}
              id="installments"
              className="form-control"
              name="installments"
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
            <input type="text" id="docNumber" data-checkout="docNumber" />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value="test@test.com" />
          </p>
          <input
            ref={paymentIdRef}
            type="hidden"
            name="payment_method_id"
            id="payment_method_id"
          />
          <input type="submit" value="Pagar" />
          {cardToken}
        </fieldset>
      </form>
    </>
  );
};
