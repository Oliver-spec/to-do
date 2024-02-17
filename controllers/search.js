const { z } = require("zod");
const fetchEvents = require("./functions/fetchEvents");

async function searchEvents(req, res, next) {
  try {
    const { searchFor, page, filter } = req.query;

    const validatedSearchFor = z.string().max(1000).parse(searchFor);
    const validatedFilter = z.enum(["", "done", "notDone"]).parse(filter);
    const validatedPage = z.coerce.number().int().positive().safe().parse(page);

    const resData = await fetchEvents(
      validatedPage,
      validatedSearchFor,
      validatedFilter
    );

    res.status(200).send(resData);
  } catch (err) {
    next(err);
  }
}

module.exports = searchEvents;
