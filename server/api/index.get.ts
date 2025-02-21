import { z } from "zod";

const schema = z.object({
  url: z.string().url(),
  responseType: z.enum(["blob", "text"]).optional()
});

export default eventHandler(async (event) => {
  const {
    url,
    responseType = "text"
  } = await getValidatedQuery(event, (data) => schema.parse(data));

  switch (responseType) {
    case "blob": {
      return $fetch<Blob>(url, {
        responseType: "blob"
      });
    }
    case "text": {
      const { headers, _data: image } = await $fetch.raw<ArrayBuffer>(url, {
        responseType: "arrayBuffer"
      });

      const base64 = Buffer.from(image!).toString("base64");

      return `data:${headers.get("content-type")};base64,${base64}`;
    }
  }
});