import type { Config } from 'jest'

const config: Config = {
	collectCoverage: false,
	moduleDirectories: ['node_modules', 'src'],
	preset: 'ts-jest',
	rootDir: 'src',
	setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
	testEnvironment: 'node',
}

export default config
