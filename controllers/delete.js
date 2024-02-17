const { z } = require("zod");
const fetchEvents = require("./functions/fetchEvents");
const db = require("../database/connect");

async function deleteEvent(req, res, next) {
  try {
    const eventId = req.params.eventId;
    const { page } = req.query;

    const validatedEventId = z.string().uuid().parse(eventId);
    const validatedPage = z.coerce.number().int().positive().safe().parse(page);

    await db.none(
      `
      DELETE FROM 
        events 
      WHERE 
        event_id = $1
      `,
      [validatedEventId]
    );

    const resData = await fetchEvents(validatedPage);

    res.status(200).send(resData);
  } catch (err) {
    next(err);
  }
}

module.exports = deleteEvent;
