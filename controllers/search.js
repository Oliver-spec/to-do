const { z } = require("zod");
const { fetchEvents } = require("./functions");

async function searchEvents(req, res, next) {
  try {
    const { searchFor, page } = req.query;

    const validatedSearchFor = z.string().max(1000).parse(searchFor);
    const validatedPage = z.coerce.number().int().positive().safe().parse(page);

    const resData = await fetchEvents(validatedPage, validatedSearchFor);

    res.status(200).send(resData);
  } catch (err) {
    next(err);
  }
}

module.exports = searchEvents;
