const db = require("../../database/connect");

async function fetchEvents(page, searchFor = "", filter = "", limit = 6) {
  const offset = limit * (page - 1);

  const events = await db.any(
    `
    SELECT 
      event_name, 
      event_id, 
      status, 
      CAST(event_date as char(10)) 
    FROM 
      events
    WHERE 
      event_name 
    ILIKE 
      $1
    AND
      status
    LIKE
      $2
    ORDER BY 
      event_date, event_id
    LIMIT 
      $3
    OFFSET 
      $4
    `,
    [`%${searchFor}%`, `${filter}%`, limit, offset]
  );

  const { count } = await db.one(
    `
    SELECT 
      COUNT(*) 
    FROM 
      events
    WHERE
      event_name
    ILIKE
      $1
    AND
      status
    ILIKE
      $2
    `,
    [`%${searchFor}%`, `${filter}%`]
  );
  const maxPage = Math.floor(count / limit + 1);

  const resData = { events: events, maxPage: maxPage };

  return resData;
}

module.exports = fetchEvents;
