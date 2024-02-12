const db = require("../database/connect");

async function fetchEvents(page, searchFor = "", limit = 6) {
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
    ORDER BY 
      event_date 
    LIMIT 
      $2 
    OFFSET 
      $3
    `,
    [`%${searchFor}%`, limit, offset]
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
    `,
    [`%${searchFor}%`]
  );
  const maxPage = Math.floor(count / limit + 1);

  const resData = { events: events, maxPage: maxPage };

  return resData;
}

module.exports = {
  fetchEvents,
};
