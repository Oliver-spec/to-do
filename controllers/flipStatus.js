const { z } = require("zod");
const { fetchEvents } = require("./functions");
const db = require("../database/connect");

async function flipStatus(req, res, next) {
  try {
    const id = req.params.eventId;
    const { page } = req.query;

    const validatedId = z.string().uuid().parse(id);
    const validatedPage = z.coerce.number().int().positive().safe().parse(page);

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
    const resData = await fetchEvents(validatedPage);

    res.status(201).send(resData);
  } catch (err) {
    next(err);
  }
}

module.exports = flipStatus;
