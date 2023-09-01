import sendMail from "../utils/mailer";
import newMatchEmail from "../emails/newMatch";

const cheerio = require("cheerio");

const replacePlaceholders = (values, emailTemplate) => {
  const $ = cheerio.load(emailTemplate, { xmlMode: false });

  // Handle text nodes
  const textNodes = $("*")
    .contents()
    .filter((_, e) => e.type === "text");
  textNodes.each((_, textNode) => {
    textNode.data = textNode.data.replace(
      /{{(.+?)}}/g,
      (match, placeholder) => {
        const value = values[placeholder];
        if (value) {
          return value;
        } else {
          $(textNode.parent).remove();
          return "";
        }
      }
    );

    // Parse the new data as HTML and replace the original text node with it
    const parsedHTML = cheerio.load(textNode.data, { xmlMode: false }).root();
    $(textNode).replaceWith(parsedHTML.contents());
  });

  // Handle attributes
  $("*").each((_, element) => {
    for (let attr in element.attribs) {
      element.attribs[attr] = element.attribs[attr].replace(
        /{{(.+?)}}/g,
        (match, placeholder) => {
          const value = values[placeholder];
          if (value) {
            return value;
          } else {
            $(element).remove();
            return "";
          }
        }
      );
    }
  });

  return $.html();
};

export const sendNewMatchEmail = async (data) => {
  const emailContent = replacePlaceholders(
    data.values,
    newMatchEmail.compiledHtml
  );

  await sendMail(data.recipient, data.title, emailContent);
};
