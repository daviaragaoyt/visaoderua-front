const fs = require('fs');

const path = 'c:\\Users\\davia\\Documents\\github\\visaoderua\\frontend\\src\\app\\checkout\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add states
content = content.replace(
  '  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit_card">("pix");',
  `  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit_card">("pix");
  
  // Backend Integration State
  const [pixData, setPixData] = useState<{ qr_code_base64?: string; qr_code?: string } | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);`
);

content = content.replace(
  `  const [addressData, setAddressData] = useState({
    logradouro: "",
    numero: "",
    bairro: "",
    ra: "", // Região Administrativa
  });`,
  `  const [addressData, setAddressData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    logradouro: "",
    numero: "",
    complemento: "",
    ra: "",
  });`
);

// 2. Update useEffect for PIX polling
content = content.replace(
  /  useEffect\(\(\) => \{\n    let interval: NodeJS\.Timeout;\n    if \(step === "pix_waiting"\) \{[\s\S]*?\} \}, \[step\]\);/,
  `  useEffect(() => {
    let interval: NodeJS.Timeout;
    let pollInterval: NodeJS.Timeout;

    if (step === "pix_waiting") {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Poll backend for PIX status
      if (orderId) {
        pollInterval = setInterval(async () => {
          try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
            const res = await fetch(\`\${apiUrl}/api/orders/\${orderId}/status\`);
            if (res.ok) {
              const data = await res.json();
              if (data.status === "PAID") {
                handleSuccess();
              }
            }
          } catch (err) {
            console.error("Erro ao verificar status", err);
          }
        }, 5000);
      }

      return () => {
        clearInterval(interval);
        if (pollInterval) clearInterval(pollInterval);
      };
    }
  }, [step, orderId]);`
);

// 3. Update proceedToPayment
content = content.replace(
  /  const proceedToPayment = \(e: React\.FormEvent\) => \{\n    e\.preventDefault\(\);\n    if \(cep\.length < 9\) \{\n      setCepError\("CEP inválido\."\);\n      return;\n    \}\n    setStep\("payment"\);\n  \};/,
  `  const proceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length < 9) {
      setCepError("CEP inválido.");
      return;
    }
    const form = e.target as HTMLFormElement;
    setAddressData({
      nome: (form.elements.namedItem('nome') as HTMLInputElement).value,
      cpf: (form.elements.namedItem('cpf') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      telefone: (form.elements.namedItem('telefone') as HTMLInputElement).value,
      logradouro: (form.elements.namedItem('logradouro') as HTMLInputElement).value,
      numero: (form.elements.namedItem('numero') as HTMLInputElement).value,
      complemento: (form.elements.namedItem('complemento') as HTMLInputElement).value,
      ra: (form.elements.namedItem('ra') as HTMLSelectElement).value,
    });
    setStep("payment");
  };`
);

// 4. Update handlePayment
content = content.replace(
  /  const handlePayment = \(e: React\.FormEvent\) => \{\n    e\.preventDefault\(\);\n    if \(paymentMethod === "pix"\) \{\n      setStep\("pix_waiting"\);\n    \} else \{\n      \/\/ Simulate credit card processing\n      handleSuccess\(\);\n    \}\n  \};/,
  `  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
      
      const payload = {
        customer: {
          name: addressData.nome,
          email: addressData.email,
          cpf: addressData.cpf.replace(/\\D/g, ""),
          phone: addressData.telefone
        },
        address: {
          street: addressData.logradouro,
          number: addressData.numero,
          complement: addressData.complemento,
          neighborhood: addressData.ra,
          city: "Brasília", // Hardcoded per your default
          cep: cep
        },
        items: items.map(item => ({ productId: item.id, quantity: item.quantity })),
        paymentMethod: paymentMethod === "pix" ? "PIX" : "CREDIT_CARD",
      };

      const response = await fetch(\`\${apiUrl}/api/orders/checkout\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Erro ao criar pedido");
      }

      const data = await response.json();
      setOrderId(data.orderId);

      if (paymentMethod === "pix") {
        setPixData(data.paymentResult);
        setStep("pix_waiting");
      } else {
        handleSuccess(); // Mock success for credit card
      }
    } catch (err) {
      console.error(err);
      alert("Houve um erro ao processar o pagamento.");
    } finally {
      setIsProcessing(false);
    }
  };`
);

// 5. Add names to form inputs
content = content.replace('type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white"', 'name="nome" type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white"');
content = content.replace('type="text" placeholder="000.000.000-00"', 'name="cpf" type="text" placeholder="000.000.000-00"');
content = content.replace('type="email" className="w-full', 'name="email" type="email" className="w-full');
content = content.replace('type="text" placeholder="(61)', 'name="telefone" type="text" placeholder="(61)');
content = content.replace('name="cep"\n                    type="text" \n                    value={cep}', 'name="cep"\n                    type="text" \n                    value={cep}');
// Some inputs we can just target contextually if needed... wait, let's just use string replacement carefully
content = content.replace('<input required type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />', '<input name="logradouro" required type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />');
content = content.replace('<input required type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />', '<input name="numero" required type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />');
content = content.replace('<input type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />', '<input name="complemento" type="text" className="w-full bg-background border border-gray-700 rounded p-2 text-white" />');
content = content.replace('<select required className="w-full bg-background', '<select name="ra" required className="w-full bg-background');

// Ensure cep name
content = content.replace('type="text" \n                    value={cep}', 'name="cep" \n                    type="text" \n                    value={cep}');


// 6. Update PIX display
content = content.replace(
  /<div className="w-48 h-48 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center relative">[\s\S]*?<\/div>/,
  `{pixData?.qr_code_base64 ? (
                  <img src={\`data:image/jpeg;base64,\${pixData.qr_code_base64}\`} alt="QR Code PIX" className="w-48 h-48" />
                ) : (
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center relative animate-pulse">
                     <QrCode className="w-12 h-12 text-gray-400" />
                  </div>
                )}`
);

content = content.replace(
  /<p className="text-sm font-mono text-gray-300 truncate mr-4">00020126580014br\.gov\.bcb\.pix013600000000-0000-0000-0000-000000000000...<\/p>\n                <button className="text-blood hover:text-white transition flex items-center gap-1 font-bold text-sm">/,
  `<p className="text-sm font-mono text-gray-300 truncate mr-4">
                  {pixData?.qr_code || "Gerando PIX..."}
                </p>
                <button 
                  type="button"
                  onClick={() => pixData?.qr_code && navigator.clipboard.writeText(pixData.qr_code)}
                  className="text-blood hover:text-white transition flex items-center gap-1 font-bold text-sm"
                >`
);

content = content.replace(
  /<p className="text-xs text-gray-500 mt-4">\(Simulação: Você será redirecionado para o sucesso em ~10 segundos\)<\/p>/,
  `<p className="text-xs text-gray-500 mt-4">(Assim que pago, você será redirecionado automaticamente.)</p>`
);

// update submit button
content = content.replace(
  /<button \n                  type="submit" \n                  className="w-2\/3 bg-blood hover:bg-blood-hover text-white font-stencil text-xl py-4 rounded transition-colors"\n                >/,
  `<button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-2/3 bg-blood hover:bg-blood-hover disabled:opacity-50 text-white font-stencil text-xl py-4 rounded transition-colors"
                >
                  {isProcessing ? "PROCESSANDO..." : "FINALIZAR COMPRA"}`
);
content = content.replace(
  /FINALIZAR COMPRA\n                <\/button>/,
  `</button>`
);

fs.writeFileSync(path, content, 'utf8');
