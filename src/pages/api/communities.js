import { SiteClient } from 'datocms-client';

export default async function preview(req, res) {
  if (req.method === 'POST') {
    const TOKEN = process.env.DATOCMS_TOKEN;
    const client = new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: '971838',
      ...req.body,
    });

    res.json({
      record: record,
    });

    return;
  }

  res.status(404).json({
    message: 'No data with GET method, using POST method!',
  });
}
