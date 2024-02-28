import type { IRestApiContext } from '@/Interface';
import { get, post, patch } from '@/utils/apiUtils';
import type {
	Project,
	ProjectCreateRequest,
	ProjectUpdateRequest,
	ProjectRelationsRequest,
} from '@/features/projects/projects.types';

export const getAllProjects = async (context: IRestApiContext): Promise<Project[]> => {
	const { data } = await get(context.baseUrl, '/projects');
	return data;
};

export const getMyProjects = async (context: IRestApiContext): Promise<Project[]> => {
	const { data } = await get(context.baseUrl, '/projects/my-projects');
	return data;
};

export const getPersonalProject = async (context: IRestApiContext): Promise<Project> => {
	const { data } = await get(context.baseUrl, '/projects/personal');
	return data;
};

export const getProject = async (context: IRestApiContext, id: string): Promise<Project> => {
	const { data } = await get(context.baseUrl, `/projects/${id}`);
	return data;
};

export const createProject = async (
	context: IRestApiContext,
	req: ProjectCreateRequest,
): Promise<Project> => {
	const { data } = await post(context.baseUrl, '/projects', req);
	return data;
};

export const setProjectRelations = async (
	context: IRestApiContext,
	req: ProjectRelationsRequest,
): Promise<void> => {
	const { id, relations } = req;
	await patch(context.baseUrl, `/projects/${id}/relations`, { relations });
};

export const updateProject = async (
	context: IRestApiContext,
	req: ProjectUpdateRequest,
): Promise<void> => {
	const { id, name } = req;
	await patch(context.baseUrl, `/projects/${id}`, { name });
};
