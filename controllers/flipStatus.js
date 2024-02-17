const { z } = require("zod");
const fetchEvents = require("./functions/fetchEvents");
const db = require("../database/connect");

async function flipStatus(req, res, next) {
  try {
    const id = req.params.eventId;
    const { page, searchFor, filter } = req.query;

    const validatedId = z.string().uuid().parse(id);
    const validatedPage = z.coerce.number().int().positive().safe().parse(page);
    const validatedSearchFor = z.string().max(1000).parse(searchFor);
    const validatedFilter = z.enum(["", "done", "notDone"]).parse(filter);

    const { status } = await db.one(
      `
      SELECT 
        status 
      FROM 
        events 
      WHERE 
        event_id = $1
      `,
      [validatedId]
    );

    let newStatus = "";
    if (status === "notDone") {
      newStatus = "done";
    } else {
      newStatus = "notDone";
    }

    await db.none(
      `
      UPDATE 
        events 
      SET 
        status = $1 
      WHERE 
        event_id = $2
      `,
      [newStatus, validatedId]
    );
    const resData = await fetchEvents(
      validatedPage,
      validatedSearchFor,
      validatedFilter
    );

    res.status(201).send(resData);
  } catch (err) {
    next(err);
  }
}

module.exports = flipStatus;
