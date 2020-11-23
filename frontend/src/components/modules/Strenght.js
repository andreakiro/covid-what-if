import React from "react";

export default function Strength() {
  return (
    <div className="block">
      <div className="mt-2">
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-indigo-600"
              name="radio-colors"
              value="1"
              checked
            />
            <span className="ml-2">Level 1</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-green-500"
              name="radio-colors"
              value="2"
              checked
            />
            <span className="ml-2">Level 2</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-pink-600"
              name="radio-colors"
              value="3"
              checked
            />
            <span className="ml-2">Level 3</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-red-600"
              name="radio-colors"
              value="4"
              checked
            />
            <span className="ml-2">Level 4</span>
          </label>
        </div>
      </div>
    </div>
  );
}
