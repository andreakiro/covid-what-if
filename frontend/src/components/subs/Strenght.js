import React from 'react';

export default function Strength() {
  return (
    <div class="block">
      <div class="mt-2">
        <div>
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio text-indigo-600"
              name="radio-colors"
              value="1"
              checked
            />
            <span class="ml-2">Level 1</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio text-green-500"
              name="radio-colors"
              value="2"
              checked
            />
            <span class="ml-2">Level 2</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio text-pink-600"
              name="radio-colors"
              value="3"
              checked
            />
            <span class="ml-2">Level 3</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input
              type="radio"
              class="form-radio text-red-600"
              name="radio-colors"
              value="4"
              checked
            />
            <span class="ml-2">Level 4</span>
          </label>
        </div>
      </div>
    </div>
  );
}
