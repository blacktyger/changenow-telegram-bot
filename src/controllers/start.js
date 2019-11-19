// Start scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import Extra from 'telegraf/extra';
import Markup from 'telegraf/markup';
import { getAllCurrencies } from '../api';
import { saveToSession } from '../helpers';
import { messages } from '../messages';
import { config } from '../config';

const start = new Scene('start');
const { leave } = Stage;

start.enter(async ctx => {
  console.log('in start scene');
  const hash = +new Date();
  const uid = ctx.session.userId;

//   const termsOfUseBtn = Extra.HTML().markup(m =>
//   m.inlineKeyboard(
//     [
//       [
//         m.urlButton(
//           config.kb.terms,
//           `${process.env.APP_HOST}/terms-of-use/${hash}?id=${uid}`,
//           false
//         )
//       ]
//     ],
//     {}
//   )
// );

  ctx.replyWithHTML(`Please follow the link: <a href="${process.env.APP_HOST}/terms-of-use/${hash}?id=${uid}">Terms of Use and Privacy policy</a>`, true);

  // ctx.reply('Please follow the link to accept our Terms of Use and Privacy Policy. Then, return to the bot to proceed.', termsOfUseBtn);

  try {
    const currs = await getAllCurrencies();
    if (!currs || !currs.length) {
      await ctx.reply();
      return;
    }
    saveToSession(ctx, 'currs', currs);
  } catch (error) {
    await ctx.reply('Server error. Try later');
    return;
  }
});

start.hears(/Start exchange/, ctx => ctx.scene.enter('curr_from'));

export default start;
