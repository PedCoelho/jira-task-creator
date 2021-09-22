import { getProjId } from "./userHelpers.js";
import { selectEl } from "./utils.js";

//todo potencialmente a funcao pode ser exportada para ser usada no form com mais liberdade
//todo não precisa ficar aqui

/* -------------------------------------------------------------------------- */
/*                                get projectID                               */
/* -------------------------------------------------------------------------- */

export async function sendTask(task, proj_id) {
  let fields = {
    summary: task.title,
    description: Boolean(task.description)
      ? {
          version: 1,
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: `DOD: ${task.description}`,
                },
              ],
            },
          ],
        }
      : null,
    project: { id: proj_id },
    issuetype: { name: "História" },
  };

  let payload = {
    fields,
  };

  return await fetch(
    `https://transformacaodigitalspassu.atlassian.net/rest/api/3/issue/`,
    {
      headers: {
        accept: "application/json,text/javascript,*/*",
        "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "content-type": "application/json",
        "sec-ch-ua":
          '" Not;A Brand";v="99", "Microsoft Edge";v="91", "Chromium";v="91"',
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-atlassian-capability": "CLASSIC_BOARD",
      },
      referrerPolicy: "same-origin",
      body: JSON.stringify(payload),
      method: "POST",
      mode: "cors",
      credentials: "include",
    }
  );
}
