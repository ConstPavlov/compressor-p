export default async function handler(req, res) {
  const token = process.env.GH_TOKEN;
  const owner = process.env.OWNER;
  const repo = process.env.REPO;
  const filePath = process.env.FILE_PATH;

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3.raw",
        "User-Agent": "Vercel-Proxy",
      },
    }
  );

  if (!response.ok) {
    return res.status(response.status).send("Ошибка загрузки скрипта");
  }

  const js = await response.text();
  res.setHeader("Content-Type", "application/javascript");
  return res.send(js);
}
