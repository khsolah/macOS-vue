import {
  EFileKind,
  EFileType,
  type TFile,
  type TFolder,
} from '~/components/Application/Finder/types';

export const useFinderStore = defineStore('Finder', () => {
  const folder = ref<TFolder>({
    name: 'root',
    dateModified: '--',
    size: '--',
    kind: EFileKind.FOLDER,
    type: EFileType.FOLDER,
    files: [
      {
        name: 'Applications',
        dateModified: '--',
        size: '--',
        kind: EFileKind.FOLDER,
        type: EFileType.FOLDER,
        files: [],
      },
      {
        name: 'Desktop',
        dateModified: '--',
        size: '--',
        kind: EFileKind.FOLDER,
        type: EFileType.FOLDER,
        files: [
          {
            name: 'Nuxt3-Project',
            dateModified: '--',
            size: '--',
            kind: EFileKind.FOLDER,
            type: EFileType.FOLDER,
            files: [
              {
                name: 'components',
                dateModified: '--',
                size: '--',
                kind: EFileKind.FOLDER,
                type: EFileType.FOLDER,
                files: [
                  {
                    name: 'Application',
                    dateModified: '--',
                    size: '--',
                    kind: EFileKind.FOLDER,
                    type: EFileType.FOLDER,
                    files: [
                      {
                        name: 'Finder',
                        dateModified: '--',
                        size: '--',
                        kind: EFileKind.FOLDER,
                        type: EFileType.FOLDER,
                        files: [
                          {
                            name: 'Table',
                            dateModified: '--',
                            size: '--',
                            kind: EFileKind.FOLDER,
                            type: EFileType.FOLDER,
                            files: [
                              {
                                name: 'Data.vue',
                                dateModified: '--',
                                size: '--',
                                kind: EFileKind.JS,
                                type: EFileType.DOCUMENT,
                              },
                              {
                                name: 'Head.vue',
                                dateModified: '--',
                                size: '--',
                                kind: EFileKind.JS,
                                type: EFileType.DOCUMENT,
                              },
                              {
                                name: 'Row.vue',
                                dateModified: '--',
                                size: '--',
                                kind: EFileKind.JS,
                                type: EFileType.DOCUMENT,
                              },
                            ],
                          },
                          {
                            name: 'index.vue',
                            dateModified: '--',
                            size: '--',
                            kind: EFileKind.JS,
                            type: EFileType.DOCUMENT,
                          },
                          {
                            name: 'Table.vue',
                            dateModified: '--',
                            size: '--',
                            kind: EFileKind.JS,
                            type: EFileType.DOCUMENT,
                          },
                          {
                            name: 'types.ts',
                            dateModified: '--',
                            size: '--',
                            kind: EFileKind.JS,
                            type: EFileType.DOCUMENT,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'pages',
                dateModified: '--',
                size: '--',
                kind: EFileKind.FOLDER,
                type: EFileType.FOLDER,
                files: [
                  {
                    name: 'index.js',
                    dateModified: '--',
                    size: '--',
                    kind: EFileKind.JS,
                    type: EFileType.DOCUMENT,
                  },
                ],
              },
              {
                name: 'store',
                dateModified: '--',
                size: '--',
                kind: EFileKind.FOLDER,
                type: EFileType.FOLDER,
                files: [
                  {
                    name: 'Application',
                    dateModified: '--',
                    size: '--',
                    kind: EFileKind.FOLDER,
                    type: EFileType.FOLDER,
                    files: [
                      {
                        name: 'index.spec.js',
                        dateModified: '--',
                        size: '--',
                        kind: EFileKind.JS,
                        type: EFileType.DOCUMENT,
                      },
                      {
                        name: 'index.js',
                        dateModified: '--',
                        size: '--',
                        kind: EFileKind.JS,
                        type: EFileType.DOCUMENT,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'test.js',
        dateModified: '--',
        size: '--',
        kind: EFileKind.JS,
        type: EFileType.DOCUMENT,
      },
    ],
  });

  // focus
  const focusItem = ref<TFile | TFolder | null>(null);
  const handleFocus = (item: TFile | TFolder, event: FocusEvent) => {
    focusItem.value = item;
    (event.currentTarget as HTMLTableRowElement).focus();
  };

  // expand
  const expandedMap = ref(new Map<string, number>());
  const expandedSet = ref(new Set<string>());
  const handleExpand = (
    folder: TFile | TFolder,
    status: boolean,
    path: string,
  ) => {
    const originCount = expandedMap.value.get(path) ?? 0;
    const afterUpdateCount = expandAllChild(folder, status, path);
    const diff = afterUpdateCount - originCount;

    // update expanded count
    const paths = path.split('/');
    const n = paths.length - 1;
    let currentPath = '~';

    for (let i = 1; i < n; ++i)
      expandedMap.value.set(
        (currentPath += `/${paths[i]}`),
        expandedMap.value.get(currentPath)! + diff,
      );
  };
  const expandAllChild = (
    folder: TFile | TFolder,
    status: boolean,
    path: string,
  ): number => {
    if (folder.kind !== EFileKind.FOLDER) return 0;

    let count = status ? folder.files.length : 0;
    if (status) expandedSet.value.add(path);
    else expandedSet.value.delete(path);

    for (const file of folder.files)
      if (status && expandedSet.value.has(`${path}/${file.name}`))
        count += expandAllChild(file, true, `${path}/${file.name}`);

    expandedMap.value.set(path, count);

    return count;
  };

  const getFolderByPath = (path: string): TFolder => {
    const paths = path.split('/');
    let curr = folder.value;

    for (let i = 1; paths[i]; ++i) {
      const target = curr.files.find((file) => file.name === paths[i]);
      if (!target || target.kind !== EFileKind.FOLDER)
        throw new Error(`Cannot find the folder from path: ${paths.join('/')}`);
      curr = target;
    }

    return curr;
  };

  return {
    handleFocus,
    focusItem,
    expandedSet,
    expandedMap,
    handleExpand,
    getFolderByPath,
  };
});
