//tests to ensure helper functions are working correctly
import { checkCapacity } from "./hashmap.js";

test("checkCapacity is defined", () => {
  expect(checkCapacity()).toBeDefined();
});

test("checkCapacity returns false if the capacity does not need updating", () => {
    const loadFactor = 0.75
    const currentCapacity = 16
    const entries = 1
  expect(checkCapacity(loadFactor, currentCapacity, entries)).toBe(false);
});

test("checkCapacity returns false if the capacity does not need updating", () => {
    const loadFactor = 0.75
    const currentCapacity = 32
    const entries = 0
  expect(checkCapacity(loadFactor, currentCapacity, entries)).toBe(false);
});

test("checkCapacity returns true if the capacity does need updating", () => {
    const loadFactor = 0.75
    const currentCapacity = 16
    const entries = 13
  expect(checkCapacity(loadFactor, currentCapacity, entries)).toBe(true);
});

test("checkCapacity returns false if the capacity does not need updating", () => {
    const loadFactor = 0.75
    const currentCapacity = 32
    const entries = 24
  expect(checkCapacity(loadFactor, currentCapacity, entries)).toBe(false);
});

test("checkCapacity returns true if the capacity does need updating", () => {
    const loadFactor = 0.75
    const currentCapacity = 32
    const entries = 25
  expect(checkCapacity(loadFactor, currentCapacity, entries)).toBe(true);
});
