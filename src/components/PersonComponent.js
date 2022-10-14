import React, { useState } from 'react';
import Parse from 'parse/dist/parse.min.js';

export const PersonComponent = () => {
  // State variables
  const [person, setPerson] = useState([]);

  async function addPerson() {
    try {
      // create a new Parse Object instance
      const Person = new Parse.Object('Person');
      // define the attributes you want for your Object
      Person.set('name', 'John');
      Person.set('email', 'john@back4app.com');
      // save it on Back4App Data Store
      await Person.save();
      alert('Person saved!');
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  async function fetchPerson() {
    const parseQuery = new Parse.Query('Person');
    try {
        let todos = await parseQuery.find();
        setPerson(todos);
        return true;
      } catch (error) {
        console.log(error.message)
        return false;
      };
  }

  return (
    <div>
      <button onClick={addPerson}>Add Person</button>
      <button onClick={fetchPerson}>Fetch Person</button>
       {/* {person !== null && (
          person.map(pers => {
            return <div key={pers.get("name")}>{pers.get("name")}</div>
          }) 
      )}  */}
    </div>
  );
};