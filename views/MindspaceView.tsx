
import React from 'react';
import { motion } from 'framer-motion';

const MindspaceView: React.FC = () => {
  return (
    <div className="pt-32 pb-40 px-6 min-h-screen max-w-5xl mx-auto">
      <div className="text-center mb-40">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10vw] font-display font-bold text-white/5 absolute left-1/2 -translate-x-1/2 top-20 select-none">
          SAHIR
        </motion.span>
        <h2 className="text-7xl font-display font-bold text-white italic relative z-10">Sikandar</h2>
        <p className="text-sky-400 font-display uppercase tracking-[0.5em] text-[10px] font-bold mt-4">The Poetic Resonance of Aman</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
          <div className="space-y-4 text-right">
            <p className="text-3xl text-slate-300 font-light leading-relaxed">एक दुनिया था ख़ुद में, और था ये भी की <br />मुट्ठी भर राख के मुक़ाबिल ना था ।</p>
          </div>
          <div className="space-y-4 text-right">
            <p className="text-3xl text-slate-300 font-light leading-relaxed">पूछते हैं उनसे अकेलेपन की इंतहाँ ? <br />वो ख़ुद अपने जनाज़े में शामिल ना था ।</p>
          </div>
          <div className="space-y-4 text-right">
            <p className="text-3xl text-sky-300 font-light leading-relaxed">वो टूट के भी मुस्कुरा रहा है अमन से , <br />कुछ भी था, वो रोने के क़ाबिल ना था।</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="pt-20 border-l border-white/5 pl-20 space-y-12">
          <div className="text-sm uppercase tracking-widest text-yellow-100 font-bold">मेरे साहिर.</div>
          <p className="text-xl text-slate-400 leading-relaxed font-light italic">
            तेरे हिस्से का साहिर सबब जो बचा हुआ है <br />हम इसे एक ज़माने तक ज़िंदा रखेंगे। <br /><br />
            मेरे जनाज़े में जो परेशान लग रहे थे <br />कह रहे हैं, पिंजरे में कोई नया परिंदा रखेंगे।
          </p>
          <div className="glass p-8 rounded-3xl border-sky-400/10">
            <p className="text-xs text-slate-500 italic">"मर गए पर चिल्ला रही है ख़ामोशी,।२। इतना न पूछ सका, हमें कब विदा करेंगे।"</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-60 glass p-20 rounded-[4rem] border-white/5 text-center">
        <h3 className="text-4xl font-display font-bold text-white mb-10 italic">“ क्या हूँ मैं? “</h3>
        <p className="text-slate-400 text-2xl font-light leading-relaxed max-w-2xl mx-auto">
          "जब लगेगा कुछ फिसल सा रहा है हाथों से… कस के पकड़ूँगा नहीं, छोड़ दूँगा । जब भी धूल दिखेगी रिश्तों पर मेरे .. उसे फूकूँगा एक बार, फिर तोड़ दूँगा ।"
        </p>
      </div>
    </div>
  );
};

export default MindspaceView;
