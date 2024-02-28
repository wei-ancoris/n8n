import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRootStore } from '@/stores/n8nRoot.store';
import * as projectsApi from '@/features/projects/projects.api';
import type {
	Project,
	ProjectCreateRequest,
	ProjectListItem,
	ProjectUpdateRequest,
} from '@/features/projects/projects.types';

export const useProjectsStore = defineStore('projects', () => {
	const route = useRoute();
	const rootStore = useRootStore();

	const projects = ref<ProjectListItem[]>([]);
	const myProjects = ref<ProjectListItem[]>([]);
	const personalProject = ref<Project | null>(null);
	const currentProject = ref<Project>({} as Project);

	const setCurrentProject = (project: Project) => {
		currentProject.value = project;
	};

	const getAllProjects = async () => {
		projects.value = await projectsApi.getAllProjects(rootStore.getRestApiContext);
	};

	const getMyProjects = async () => {
		myProjects.value = (await projectsApi.getMyProjects(rootStore.getRestApiContext)).filter(
			(p) => !!p.name,
		);
	};

	const getPersonalProject = async () => {
		personalProject.value = await projectsApi.getPersonalProject(rootStore.getRestApiContext);
	};

	const getProject = async (id: string) => {
		currentProject.value = await projectsApi.getProject(rootStore.getRestApiContext, id);
	};

	const createProject = async (project: ProjectCreateRequest): Promise<void> => {
		const { id, name } = await projectsApi.createProject(rootStore.getRestApiContext, project);
		myProjects.value.unshift({ id, name } as ProjectListItem);
	};

	const updateProject = async (projectData: ProjectUpdateRequest): Promise<void> => {
		await projectsApi.updateProject(rootStore.getRestApiContext, projectData);
		const projectIndex = myProjects.value.findIndex((p) => p.id === projectData.id);
		if (projectIndex !== -1) {
			myProjects.value[projectIndex].name = projectData.name;
		}
	};

	watch(
		route,
		async (newRoute) => {
			if (!newRoute?.params?.projectId) {
				return;
			}
			await getProject(newRoute.params.projectId as string);
		},
		{ immediate: true },
	);

	return {
		projects,
		myProjects,
		currentProject,
		setCurrentProject,
		getAllProjects,
		getMyProjects,
		getPersonalProject,
		getProject,
		createProject,
		updateProject,
	};
});
