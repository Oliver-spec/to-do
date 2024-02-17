const { z } = require("zod");
const fetchEvents = require("./functions/fetchEvents");
const db = require("../database/connect");

async function deleteEvent(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const { page, searchFor, filter } = req.query;

    const validatedEventId = z.string().uuid().parse(eventId);
    const validatedPage = z.coerce.number().int().positive().safe().parse(page);
    const validatedSearchFor = z.string().max(1000).parse(searchFor);
    const validatedFilter = z.enum(["", "done", "notDone"]).parse(filter);

    await db.none(
      `
      DELETE FROM 
        events 
      WHERE 
        event_id = $1
      `,
      [validatedEventId]
    );

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

module.exports = deleteEvent;
