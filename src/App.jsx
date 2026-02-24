export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);
    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply || "Error." }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Koneksi gagal. Coba lagi." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={{minHeight:"100vh",background:"#0a0a0f",display:"flex",flexDirection:"column",alignItems:"center",fontFamily:"'DM Mono','Courier New',monospace"}}>
      <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"radial-gradient(ellipse 60% 40% at 50% 0%,rgba(99,102,241,0.15) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>
      <div style={{width:"100%",maxWidth:"720px",padding:"28px 24px 16px",zIndex:1,display:"flex",alignItems:"center",gap:"12px",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{width:36,height:36,borderRadius:"10px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",boxShadow:"0 0 20px rgba(99,102,241,0.4)"}}>✦</div>
        <div>
          <div style={{color:"#e2e8f0",fontSize:"15px",fontWeight:"600",letterSpacing:"0.05em"}}>NOVA AI</div>
          <div style={{color:"#6366f1",fontSize:"11px",letterSpacing:"0.15em"}}>ONLINE ●</div>
        </div>
      </div>
      <div style={{flex:1,width:"100%",maxWidth:"720px",padding:"24px",zIndex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"20px",minHeight:"calc(100vh - 180px)",maxHeight:"calc(100vh - 180px)",boxSizing:"border-box"}}>
        {messages.length === 0 && (
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"12px",opacity:0.5,marginTop:"20vh"}}>
            <div style={{fontSize:"48px"}}>✦</div>
            <div style={{color:"#94a3b8",fontSize:"14px",textAlign:"center",lineHeight:1.7}}>Selamat datang di NOVA AI<br/>Tanyakan apa saja.</div>
          </div>
        )}
        {messages.map((msg,i) => (
          <div key={i} style={{display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",animation:"fadeIn 0.3s ease"}}>
            {msg.role==="assistant" && <div style={{width:28,height:28,borderRadius:"8px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",marginRight:"10px",flexShrink:0,marginTop:"2px"}}>✦</div>}
            <div style={{maxWidth:"78%",padding:"12px 16px",borderRadius:msg.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:msg.role==="user"?"linear-gradient(135deg,#6366f1,#7c3aed)":"rgba(255,255,255,0.04)",border:msg.role==="user"?"none":"1px solid rgba(255,255,255,0.07)",color:"#e2e8f0",fontSize:"14px",lineHeight:"1.75",whiteSpace:"pre-wrap",wordBreak:"break-word",boxShadow:msg.role==="user"?"0 4px 20px rgba(99,102,241,0.3)":"none"}}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:28,height:28,borderRadius:"8px",background:"linear-gradient(135deg,#6366f1,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px"}}>✦</div>
            <div style={{padding:"12px 18px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:"18px 18px 18px 4px",display:"flex",gap:"6px",alignItems:"center"}}>
              {[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:"#6366f1",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      <div style={{width:"100%",maxWidth:"720px",padding:"16px 24px 28px",zIndex:1,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{display:"flex",gap:"10px",alignItems:"flex-end",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"16px",padding:"8px 8px 8px 16px"}}>
          <textarea ref={textareaRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey} placeholder="Ketik pesan... (Enter untuk kirim)" rows={1} style={{flex:1,background:"transparent",border:"none",outline:"none",color:"#e2e8f0",fontSize:"14px",fontFamily:"inherit",resize:"none",lineHeight:"1.6",maxHeight:"140px",overflowY:"auto",paddingTop:"6px",paddingBottom:"6px"}} onInput={e=>{e.target.style.height="auto";e.target.style.height=e.target.scrollHeight+"px"}}/>
          <button onClick={sendMessage} disabled={!input.trim()||loading} style={{width:40,height:40,borderRadius:"10px",background:input.trim()&&!loading?"linear-gradient(135deg,#6366f1,#7c3aed)":"rgba(255,255,255,0.05)",border:"none",cursor:input.trim()&&!loading?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",color:"white",transition:"all 0.2s",flexShrink:0}}>↑</button>
        </div>
        <div style={{textAlign:"center",marginTop:"10px",color:"rgba(255,255,255,0.2)",fontSize:"11px",letterSpacing:"0.1em"}}>NOVA AI — Powered by Claude</div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.3);border-radius:4px;}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8);}50%{opacity:1;transform:scale(1.2);}}
        textarea::placeholder{color:rgba(255,255,255,0.2);}
      `}</style>
    </div>
  );
            }
