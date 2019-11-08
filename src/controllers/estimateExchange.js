//estimateExchange  scene
import Scene from 'telegraf/scenes/base';
import { saveToSession } from '../helpers';
import { getExchAmount } from '../api';
import { typeWalletAction } from '../actions';
import { getAmountKeyboard, getMainKeyboard } from '../keyboards';
import { config } from '../config';

const estimateExchange = new Scene('est_exch');

estimateExchange.enter(async (ctx) => {
  console.log('in estimateExchange scene');
  const amount = ctx.session.amount;
  const curFrom = ctx.session.curFrom;
  const curTo = ctx.session.curTo;
  const fromTo = `${curFrom}_${curTo}`;
  const amountReq = await getExchAmount(amount, fromTo);
  const amountTotal = amountReq.estimatedAmount;
  saveToSession(ctx, 'amountTotal', amountTotal);
  ctx.replyWithHTML(`You’re sending <b>${amount} ${curFrom}</b> and you’ll get <b>${amountTotal} ${curTo}</b>.\nEnter the recipient’s <b>${curTo}</b> address`, getAmountKeyboard(ctx));
});

estimateExchange.hears([/^[A-Za-z0-9]+$/gi, config.kb.back, config.kb.cancel], ctx => {
  if (config.kb.back === ctx.message.text) {
    ctx.scene.enter('amount');
    return;
  }
  if(config.kb.cancel === ctx.message.text) {
    ctx.reply('Your exchange is canceled. Do you want to start a new exchange?', getMainKeyboard(ctx));
    ctx.scene.leave();
    return;
  }
  typeWalletAction(ctx);
});


export default estimateExchange;